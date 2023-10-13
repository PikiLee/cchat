import type { Template } from './type'

const applyTemplate = (input: string) => {
  return `Your task is to perform the following actions:
  1 - Find plausible reasons for the error delimited by <<<.
  2 - Come up with at least three possible reasons and explain why.
  3 - For every reason, come up a solution and explain the solution.
  4 - Show code example for every solution

  Use the following format:
  # Reasons
  <Reasons>

  # Reason1
  <Reason1>
  ## Explaination
  <Explaination>
  ## Solution
  <Solution>
  <Code Example>
  ### Explaination fot the solution
  <Explaination fot the solution>

  # Reason2
  <Reason2>
  ## Explaination
  <Explaination>
  ## Solution
  <Solution>
  <Code Example>
  ### Explaination fot the solution
  <Explaination fot the solution>

  <<<${input}<<<
`
}

export const error: Template = {
  type: 'single',
  title: 'Find causes for the error',
  applyTemplate,
}
