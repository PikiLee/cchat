import type { Template } from './type'

const applyTemplate = (input: string) => {
  return `Your task is to perform the following actions:
  1 - Find the phrase delimited by <<<.
  2 - Come up with at least two possible explanation in digital commerce.
  3 - Choose the right explanation.
  4 - Give a reason

  Use the following format:
  # Answer:
  # Explanation
  ## Explanation1
  <Explanation 1>
  ## Explanation2
  <Explanation 2>
  # Right Explanation
  <Right Explanation>
  # Reason
  <Reason>
  <<<${input}<<<
`
}

export const explanation: Template = {
  type: 'single',
  title: 'Explain the phrase',
  applyTemplate,
}
