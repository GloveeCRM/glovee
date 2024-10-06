import { FormQuestionSetType } from '../types/form'

export function nestQuestionSets(questionSets: FormQuestionSetType[]): FormQuestionSetType[] {
  // Create a map to store references to all nodes
  const questionSetsMap: { [key: number]: FormQuestionSetType } = {}

  // Initialize the structure for each question set
  questionSets.forEach((qs) => {
    questionSetsMap[qs.id] = { ...qs, questionSets: [] } // Copy question set and add empty questionSets field
  })

  // Define the root node list
  const rootQuestionSets: FormQuestionSetType[] = []

  // Loop through the question sets to arrange parent-child relationships
  questionSets.forEach((qs) => {
    if (qs.questionSetID === null) {
      // If there is no parent, it's a root node
      rootQuestionSets.push(questionSetsMap[qs.id])
    } else {
      // Otherwise, add it to the parent's questionSets array
      questionSetsMap[qs.questionSetID].questionSets?.push(questionSetsMap[qs.id])
    }
  })

  return rootQuestionSets
}
