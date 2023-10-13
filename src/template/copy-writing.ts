import type { Template } from './type'

const applyTemplate = (input: string) => {
  return `Your task is to perform the following actions:
  1 - Find the article delimited by <<<.
  2 - Compose a new article that has similar format, style, tone and content.
  3 - Repeat step 2.

  Use the following format:
  # First Article:
  <First Article>
  # Second Article:
  <Second Article>

  <<<${input}<<<
`
}

export const copyWriting: Template = {
  type: 'single',
  title: 'Copy writing',
  applyTemplate,
}
