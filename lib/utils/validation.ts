import { ZodSchema } from 'zod'

/**
 * Validates the given form data against the provided schema.
 */
export async function validateValuesAgainstSchema(schema: ZodSchema, values: any) {
  const result = schema.safeParse(values)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }
  return { data: result.data }
}
