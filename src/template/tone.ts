import type { Template } from './type'

const applyTemplate = (input: string, tone: string) => {
  return `Your task is to perform the following actions:
1 - Find the paragraph delimited by <<<
2 - Rewrite it with the ${tone} tone.

<<<${input}<<<
`
}

export const tones: Template = {
  type: 'group',
  title: 'Change Tone',
  applyTemplate,
  options: [
    {
      title: 'Friendly',
      value: 'friendly',
    },
    {
      title: 'Professional',
      value: 'professional',
    },
    {
      title: 'Straightforward',
      value: 'straightforward',
    },
  ],
}
