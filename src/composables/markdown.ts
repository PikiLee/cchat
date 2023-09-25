import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import type { ComputedRef, Ref } from 'vue'
import { ElMessage } from 'element-plus'
import '~/styles/markdown.scss'

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

function addCopyButton(element: HTMLElement, text: string) {
  const copyButton = document.createElement('button')
  copyButton.classList.add('copy-button')
  copyButton.textContent = 'Copy'
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(text)
    ElMessage.success('Copied to clipboard')
  })
  element.addEventListener('mouseenter', () => {
    copyButton.style.display = 'block'
  })
  element.addEventListener('mouseleave', () => {
    copyButton.style.display = 'none'
  })
  element.appendChild(copyButton)
}

export function useMarkdown(str: Ref<string> | ComputedRef<string>, element: Ref<HTMLElement | undefined>) {
  const content = computed(() => md.render(str.value))
  onMounted(() => {
    watch(content, () => {
      if (!element.value) {
        console.warn('Element is undefined')
        return
      }
      element.value.innerHTML = content.value

      // add copy button to each code block
      const codeBlocks = element.value!.querySelectorAll('.hljs')
      codeBlocks.forEach((codeBlock) => {
        addCopyButton(codeBlock as HTMLElement, codeBlock.querySelector('code') ? codeBlock.querySelector('code')!.innerText : '')
      })

      // add copy button to copy the entire content
      addCopyButton(element.value, str.value)
      element.value.style.position = 'relative'
    }, { immediate: true, deep: true })
  })
}
