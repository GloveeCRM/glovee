const errors = {
  something_went_wrong: 'Something went wrong',
  user_not_found: 'User not found',
  invalid_email_or_password: 'Invalid email or password',
  user_already_exists: 'User already exists',
  first_name_missing: 'First name is required',
  last_name_missing: 'Last name is required',
  email_missing: 'Email is required',
  password_missing: 'Password is required',
  org_name_missing: 'Organization name is required',
  invalid_role: 'Invalid user role',
  invalid_email_format: 'Invalid email format',
  password_too_short: 'Password must be at least 8 characters long',
  password_missing_uppercase: 'Password must contain at least one uppercase letter',
  password_missing_lowercase: 'Password must contain at least one lowercase letter',
  password_missing_number: 'Password must contain at least one number',
  password_missing_special_character: 'Password must contain at least one special character',
  organization_not_found: 'Organization not found',
}

export const error_messages = (error_code: string) => {
  return errors[error_code as keyof typeof errors] || 'unknown_error'
}
