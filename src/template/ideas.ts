import type { Template } from './type'

const applyTemplate = (input: string) => {
  return `Your task is to perform the following actions:
  1 - Answer the following text delimited by <<<.
  2 - Come up with at least three methods.
  3 - Explain the reason why this method would work.
  4 - List pros and cons for each method.
  5 - show code example for each method in ts and explain every step with comments
  6 - Choose the best method
  7 - Give a reason

  Use the following format:
  # Answer:
  1. <Method 1>
  2. ...
  ...
  # Methods
  ## Method 1: <Method 1>
  ...
  ### Explaination
  <Explaination>
  ### Pros
  <Pros>
  ###Cons
  <Cons>
  ###Code
  <Code>
  # Best Method: <Best Method>
  # Reason
  <Reason>
  <<<${input}<<<
`
}

export const ideas: Template = {
  type: 'single',
  title: 'Come up with ideas',
  applyTemplate,
}
