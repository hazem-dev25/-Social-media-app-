import Bytez from "bytez.js"
import { Groq } from 'groq-sdk'
import express, { Request, Response } from 'express'
import { groq_api  , image_api} from '../../config/env.service'




export const ai = express()
ai.use(express.json())


const groq = new Groq({
  apiKey: groq_api
})

type ChatItem = {
  prompt: string
  message: string
}

let groqDB: ChatItem[] = []


ai.post('/generateAI', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ message: 'prompt is required' })
    }

    const chatCompletion: any = await groq.chat.completions.create({
      messages: [
        {
         role: 'system' ,
         content:  "You are a good English assistant. Speak casually, short answers, no explanations."
        },
          ...groqDB.map(item => ([
    { role:  "user" as "user" , content: item.prompt },
    { role: "assistant" as "assistant", content: item.message }
  ])).flat(),
        {
          role: "user",
          content: prompt
        }
      ],
      model: "qwen/qwen3-32b",
      temperature: 0.7,
      max_completion_tokens: 1024 ,
      reasoning_effort: "none" ,
      
    }
  )
  groqDB.push({prompt , message:chatCompletion.choices[0].message.content} )
  console.log(groqDB)
    return res.json({
      message: chatCompletion.choices[0].message.content
    })

  } catch (error: any) {
    return res.status(500).json({
      message: 'AI Error',
      error: error.message
    })
  }
})


  const bytez = new Bytez(image_api)
  const imageModel = bytez.model("stabilityai/stable-diffusion-xl-base-1.0")

ai.post("/generateImage", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body
    if (!prompt) return res.status(400).json({ message: "prompt is required" })

    const { error, output } = await imageModel.run(prompt)

    if (error) {
      return res.status(500).json({ message: "Image generation failed", error })
    }

    return res.json({ success: true, image: output })

  } catch (error: any) {
    return res.status(500).json({ message: "Image generation failed", error: error.message })
  }
})



ai.post("/generateSpeech", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body
    if (!prompt) return res.status(400).json({ message: "text is required" })

    const speechModel = bytez.model("openai/tts-1-hd")
    const { error, output } = await speechModel.run(prompt)

    if (error) {
      return res.status(500).json({ message: "Speech generation failed", error })
    }

    return res.json({ success: true, audio: output , format: 'mp3' })

  } catch (error: any) {
    return res.status(500).json({ message: "Speech generation failed", error: error.message })
  }
})




const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
ai.post("/analyzeComments", async (req: Request, res: Response) => {
  try {
    const { comments } = req.body

    if (!comments || !Array.isArray(comments) || comments.length === 0) {
      return res.status(400).json({ message: "comments array is required" })
    }
    const results: any[] = []

    for (const comment of comments) {
      const [sentimentResult] : any = await Promise.all([
        groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `أنت محلل تعليقات. حلل التعليق وارجع JSON فقط بدون أي كلام تاني: انت محلل عربي فقط
              {
                "sentiment": "positive" | "negative" | "neutral",
                "score": number between 0 and 1,
                "reason": "سبب قصير جداً"
              }`
            },
            { role: "user", content: comment }
          ],
          model: "qwen/qwen3-32b",
          temperature: 0.1,
          max_completion_tokens: 200,
          reasoning_effort: "none"
        })
      ])

    
      let sentiment = null
      try {
        const raw = sentimentResult.choices[0].message.content || ""
        const clean = raw.replace(/```json|```/g, "").trim()
        sentiment = JSON.parse(clean)
      } catch {
        sentiment = { sentiment: "unknown", score: 0, reason: "parse error" }
      }

      results.push({
        comment,
        sentiment,
      })

      await delay(200)
    }

    
    const summary = {
      positive: results.filter(r => r.sentiment?.sentiment === "positive").length,
      negative: results.filter(r => r.sentiment?.sentiment === "negative").length,
      neutral:  results.filter(r => r.sentiment?.sentiment === "neutral").length,
    }

    
    return res.json({
      success: true,
      total_comments: comments.length,
      summary,
      details: results
    })

  } catch (error: any) {
    return res.status(500).json({ message: "Analysis failed", error: error.message })
  }
})


export default ai
