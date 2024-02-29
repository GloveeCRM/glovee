import { ZodSchema } from 'zod'

/**
 * Validates the given form data against the provided schema.
 */
export async function validateFormDataAgainstSchema(schema: ZodSchema, formData: FormData) {
  const data = Object.fromEntries(formData)
  const result = schema.safeParse(data)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }
  return { data: result.data }
}
