import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({
      message: 'Email is not valid',
    }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

export const RegisterSchema = z.object({
  firstName: z.string({
    required_error: 'First Name is required',
    invalid_type_error: 'First Name is not valid',
  }),
  lastName: z.string({
    required_error: 'Last Name is required',
    invalid_type_error: 'Last Name is not valid',
  }),
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6, {
    message: 'Password is required',
  }),
})
