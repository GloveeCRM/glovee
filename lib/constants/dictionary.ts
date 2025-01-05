const translations = {
  unknown_translation: 'Undefined',
  pending_client_submission: 'Pending Client Submission',
  client_submitted: 'Client Submitted',
  pending_organization_review: 'Pending Organization Review',
  organization_approved: 'Organization Approved',
  pending_client_revision: 'Pending Client Revision',
}

export const dictionary = (translation_code: string) => {
  return translations[translation_code as keyof typeof translations] || 'unknown_translation'
}
