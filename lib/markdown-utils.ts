import { marked } from 'marked'

export function parseMarkdown(markdown: string | null | undefined): string {
  if (!markdown) return ''
  
  try {
    marked.setOptions({
      breaks: true,
      gfm: true,
    })
    
    const html = marked.parse(markdown)
    return html as string
  } catch (error) {
    console.error('Error parsing markdown:', error)
    return markdown
  }
}
