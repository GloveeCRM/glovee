'use server'

import { LoginSchema } from '../zod/schemas'

export async function login(prevState: any | undefined, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return validatedFields.error.flatten().fieldErrors
  }
}
