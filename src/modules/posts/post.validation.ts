import z from 'zod';
import { PostVisibility } from '../../common/enums/posts.enums';


export const createPostSchema = {
    body: z.object({
        content: z.string().optional(),
        tags: z.array(z.string()).optional(),
        visibility: z.enum([PostVisibility.public, PostVisibility.private ,PostVisibility.friends]).optional(),
    }),
    files: z.array(z.any()).optional() 
}