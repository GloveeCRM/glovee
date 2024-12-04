import { FormQuestionSetType } from '../types/form'

export function nestQuestionSets(questionSets: FormQuestionSetType[]): FormQuestionSetType[] {
  // Create a map to store references to all nodes
  const questionSetsMap: { [key: number]: FormQuestionSetType } = {}

  // Initialize the structure for each question set
  questionSets.forEach((qs) => {
    questionSetsMap[qs.formQuestionSetID] = { ...qs, questionSets: [] } // Copy question set and add empty questionSets field
  })

  // Define the root node list
  const rootQuestionSets: FormQuestionSetType[] = []

  // Loop through the question sets to arrange parent-child relationships
  questionSets.forEach((qs) => {
    if (qs.formQuestionSetID === null) {
      // If there is no parent, it's a root node
      rootQuestionSets.push(questionSetsMap[qs.formQuestionSetID])
    } else {
      // Otherwise, add it to the parent's questionSets array
      questionSetsMap[qs.formQuestionSetID].questionSets?.push(
        questionSetsMap[qs.formQuestionSetID]
      )
    }
  })

  return rootQuestionSets
}
