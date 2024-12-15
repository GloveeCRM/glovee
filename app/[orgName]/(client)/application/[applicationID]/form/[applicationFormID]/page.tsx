import { fetchFormQuestionSets } from '@/lib/data/form'
import { nestQuestionSets } from '@/lib/utils/form'
import ApplicationFormQuestionSetWrapper from '@/components/client/application-form/application-form-question-set-wrapper'

export default async function ClientApplicationPage() {
  return <ApplicationFormQuestionSetWrapper />
}
