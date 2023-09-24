export interface BaseTemplate {
  type: 'single' | 'group'
  title: string
}

export interface TemplateWithoutOptions extends BaseTemplate {
  type: 'single'
  applyTemplate: (input: string) => string
}

export interface TemplateWithOptions<T = string> extends BaseTemplate {
  type: 'group'
  applyTemplate: (input: string, optionValue: T) => string
  options: {
    title: string
    value: string
  }[]
}

export type Template = TemplateWithoutOptions | TemplateWithOptions
