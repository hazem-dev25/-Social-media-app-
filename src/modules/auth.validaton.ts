import {z} from 'zod'


export const signupSchema  = {
    body: z.strictObject({
        name: z.string().min(2).max(20),
        age: z.number().min(18).max(100),
        email: z.email().trim(),
        password: z.string().min(8).max(15) ,
        confirmPassword: z.string().min(8).max(15)
    }).superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
          ctx.addIssue({
            code: 'custom',
            message: "Passwords don't match",
})}})}