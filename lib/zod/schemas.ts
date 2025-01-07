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
})

export const CreateApplicationFormSchema = z.object({
  formTemplateID: z.number().int().positive({ message: 'Template is required' }),
  formName: z.string().min(1, { message: 'Form name is required' }),
})

export const CreateFormSchema = z.object({
  clientID: z.number().int().positive({ message: 'Client is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  applicantFirstName: z.string().min(1, { message: 'First name is required' }),
  applicantLastName: z.string().min(1, { message: 'Last name is required' }),
  templateID: z.number().int().positive({ message: 'Template is required' }),
})

export const CreateFormTemplateSchema = z.object({
  formName: z
    .string({
      required_error: 'Form name is required',
      invalid_type_error: 'Form name is not valid',
    })
    .min(3, {
      message: 'Minimum 3 characters required',
    }),
  formDescription: z.string().optional(),
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

export const SendApplicationFileSchema = z.object({
  fileName: z.string().min(1, { message: 'File name is required' }),
  file: z.custom<File>((val) => val instanceof File, {
    message: 'Please select a file',
  }),
})
