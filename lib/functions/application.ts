import { ApplicationQuestionSetType } from '../types/application'

export function formatApplicationQuestionSets(questionSets: ApplicationQuestionSetType[]) {
  function nestQuestionSets(questionSets: ApplicationQuestionSetType[]) {
    let nestedQuestionSets: ApplicationQuestionSetType[] = []
    let questionSetMap: Record<string, ApplicationQuestionSetType> = {}

    // Initialize the map and separate top-level question sets
    questionSets.forEach((qs) => {
      qs.questionSets = [] // Prepare for nesting
      questionSetMap[qs.id] = qs
      if (!qs.questionSetID) {
        nestedQuestionSets.push(qs)
      }
    })

    // Nest question sets
    questionSets.forEach((qs) => {
      if (qs.questionSetID && questionSetMap[qs.questionSetID]) {
        questionSetMap[qs.questionSetID].questionSets?.push(qs)
      }
    })

    return nestedQuestionSets
  }
  return nestQuestionSets(questionSets)
}