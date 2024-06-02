import { z } from 'zod'

export const UpdateClientSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email(),
})

export const CreateClientSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email(),
})

export const CreateApplicationSchema = z.object({
  clientID: z.number().int().positive({ message: 'Client is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  applicantFirstName: z.string().min(1, { message: 'First name is required' }),
  applicantLastName: z.string().min(1, { message: 'Last name is required' }),
  templateID: z.number().int().positive({ message: 'Template is required' }),
})

export const TemplateSchema = z.object({
  name: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is not valid',
    })
    .min(3, {
      message: 'Minimum 3 characters required',
    }),
  description: z.string(),
})

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(1, {
      message: 'Password is required',
    })
    .min(6, {
      message: 'Minimum 6 characters required',
    })
    .refine((value) => /[a-z]/.test(value), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((value) => /[0-9]/.test(value), {
      message: 'Password must contain at least one number',
    })
    .refine((value) => /[@$!%*?&]/.test(value), {
      message: 'Password must contain at least one special character',
    }),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
})

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is not valid' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const SignupSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required',
      invalid_type_error: 'First Name is not valid',
    })
    .min(1, { message: 'First Name is required' }),
  lastName: z
    .string({
      required_error: 'Last Name is required',
      invalid_type_error: 'Last Name is not valid',
    })
    .min(1, { message: 'Last Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is not valid' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Minimum 8 characters required' })
    .refine((value) => /[a-z]/.test(value), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((value) => /[0-9]/.test(value), {
      message: 'Password must contain at least one number',
    })
    .refine((value) => /[@$!%*?&]/.test(value), {
      message: 'Password must contain at least one special character',
    }),
})
