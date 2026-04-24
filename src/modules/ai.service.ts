import { Groq } from 'groq-sdk'
import Bytez from "bytez.js";
import fs from 'fs'
import { groq_api, image_api } from '../config/env.service'
import { AiModel } from '../database/models/Aichat'
import { Model} from 'mongoose'
import { Aichat } from '../common/interface/user.interface'
import { DatabaseRepository } from '../database/repository/database.repository'
import { BadRequestException } from '../common/exception/application.exception'


const groq = new Groq({ apiKey: groq_api })
const sdk = new Bytez(image_api)
const videoModel = sdk.model("wan/v2.6/text-to-video")
const imageModel = sdk.model("google/gemini-3.1-flash-image-preview")




const groqDB: any[] = []

const SYSTEM_PROMPT = `
You are cool — a sharp, witty AI assistant with a chill American vibe.
Keep answers SHORT and punchy. If media is generated, just act cool about it.
`.trim()

class AIService {
    public AiModel: Model<Aichat>
    private AiRepository: DatabaseRepository<Aichat>

    constructor() {
        this.AiModel = AiModel
        this.AiRepository = new DatabaseRepository(this.AiModel)
    }

    async AiChat(prompt: string , data: any): Promise<Aichat> {
        let mediaUrl: string | null = null
        const intentResponse: any = await groq.chat.completions.create({
    messages: [
        {
            role: 'system',
            content: `You are a media intent classifier. Return ONLY JSON:
{"type": "image" | "video" | "speech" | "text", "content": "extracted content"}

Rules:
- "image": generate image → content = description
- "video": generate video → content = description  
- "speech": say/speak something → content = ONLY the text to speak (remove "say", "قولي", "اسمعني", etc.)
- "text": anything else → content = original prompt`
        },
        { role: 'user', content: prompt }
    ],
    model: "qwen/qwen3-32b",
    temperature: 0,
    max_completion_tokens: 100,
    reasoning_effort: "none"
})

const raw = intentResponse.choices[0].message.content ?? '{"type":"text","content":""}'

const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

const intent = JSON.parse(cleaned)
    try {
        if (intent.type === "video") {
            const { error, output } = await videoModel.run(prompt)
            if (!error && output) {
                mediaUrl = Array.isArray(output) ? output[0] : output
            }
        } else if (intent.type === "image") {
            const { error, output } = await imageModel.run(prompt)
            if (!error && output) {
                mediaUrl = Array.isArray(output) ? output[0] : output
            }
        } else if (intent.type === "speech") {
            const speechResponse = await groq.audio.speech.create({
                model: "canopylabs/orpheus-v1-english",
                voice: "hannah",
                input: intent.content || prompt,
                response_format: "wav"
            })
            const buffer = Buffer.from(await speechResponse.arrayBuffer())
            const fileName = `speech-${data}.wav`
            await fs.promises.writeFile(`./public/audio/${fileName}`, buffer)
           mediaUrl = `http://localhost:3000/public/audio/${fileName}`
        }
    } catch (err) {
        console.error("Generation failed:", err)
    }

        const chatCompletion: any = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: SYSTEM_PROMPT},
                ...groqDB.flatMap(item => [
                    { role: "user" as const, content: item.prompt },
                    { role: "assistant" as const, content: item.message }
                ]),
                {
                    role: "user" as const,
                    content: mediaUrl 
                        ? `${prompt}\n\n[System: Media was generated successfully. Do not include the raw data in your response.]`
                        : prompt
                }
            ],
            model: "qwen/qwen3-32b",
            temperature: 0.85,
            max_completion_tokens: 1024 ,
            reasoning_effort: "none"
        });

        const aiResponse = chatCompletion.choices[0].message.content

        groqDB.push({ prompt, message: aiResponse })
        if (groqDB.length > 10) groqDB.shift()

        const AiMemory = await this.AiRepository.create({
            prompt,
            message: aiResponse,
            media: mediaUrl ,
            status: intent.type
        });

        if (!AiMemory) throw new BadRequestException("failed to save chat data")

        return AiMemory
    }
}

export default new AIService