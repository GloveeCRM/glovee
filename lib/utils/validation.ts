import { ZodSchema } from 'zod'

/**
 * Validates the given form data against the provided schema.
 * @param {ZodSchema} schema - The Zod schema to validate against.
 * @param {FormData} formData - The form data to be validated.
 * @returns {Promise<{ errors?: any, data?: any }>} An object containing either the validated data or the validation errors.
 */
export async function validateFormDataAgainstSchema(schema: ZodSchema, formData: FormData) {
  const data = Object.fromEntries(formData)
  const result = schema.safeParse(data)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }
  return { data: result.data }
}
