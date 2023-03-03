import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import type { MaybeComputedRef } from '@vueuse/core'
import type { Ref } from 'vue'
import '~/styles/markdown.css'

const md = new MarkdownIt({
  linkify: true,
  html: true,
  breaks: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
                 hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
                 }</code></pre>`
      }
      catch (__) {}
    }

    return `<pre class="hljs"><code>${hljs.highlightAuto(str).value}</code></pre>`
  },
})

export function useMarkdown(str: MaybeComputedRef<string>, element: Ref<HTMLElement | undefined>) {
  const _str = resolveRef(str)

  const content = computed(() => md.render(_str.value))
  onMounted(() => {
    if (!element.value)
      console.warn('Element is undefined')
    watch(content, () => {
      element.value!.innerHTML = content.value
    }, { immediate: true, deep: true })
  })
}
