import { z } from 'zod'

import { UserRole } from '@prisma/client'

export const UpdateClientSchema = z.object({
  clientFirstName: z.string({
    required_error: 'First name is required',
  }),
  clientLastName: z.string({
    required_error: 'Last name is required',
  }),
  clientEmail: z.string().email().min(1, { message: 'Email is required' }),
})

export const CreateClientSchema = z.object({
  clientFirstName: z.string().min(1, { message: 'First name is required' }),
  clientLastName: z.string().min(1, { message: 'Last name is required' }),
  clientEmail: z.string().min(1, { message: 'Email is required' }).email(),
})

export const ApplicationSchema = z.object({
  role: z.string(),
  applicantFirstName: z.string(),
  applicantLastName: z.string(),
})

export const TemplateSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is not valid',
    })
    .min(3, {
      message: 'Minimum 3 characters required',
    }),
  description: z.string(),
})

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    role: z.enum([UserRole.ORG_ADMIN, UserRole.ORG_CLIENT]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }
      return true
    },
    {
      message: 'New password is required',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false
      }
      return true
    },
    {
      message: 'Password is required',
      path: ['password'],
    }
  )

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(1, {
      message: 'Password is required',
    })
    .min(6, {
      message: 'Minimum 6 characters required',
    }),
})

export const ResetPasswordSchema = z.object({
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

export const SignUpSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name is not valid',
    })
    .min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is not valid' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Minimum 6 characters required' }),
})
