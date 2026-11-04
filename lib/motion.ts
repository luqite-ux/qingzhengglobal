/**
 * Arms an element for a one-time entrance after it truly enters the viewport.
 *
 * - Content is visible by default. If this never runs (script failure,
 *   no IntersectionObserver), nothing is ever hidden.
 * - Elements already on screen, or already scrolled past, are left untouched.
 * - No global timeout ever marks unseen content as played.
 */
export function armOnEntry(element: HTMLElement, attribute: string): (() => void) | undefined {
  if (typeof IntersectionObserver === 'undefined') return undefined

  const rect = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const alreadySeen = rect.bottom <= 0 || (rect.top < viewportHeight * 0.92 && rect.bottom > 0)
  if (alreadySeen) return undefined

  element.setAttribute(attribute, 'pending')

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          element.setAttribute(attribute, 'visible')
          observer.disconnect()
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
  )
  observer.observe(element)

  return () => {
    observer.disconnect()
    element.removeAttribute(attribute)
  }
}
