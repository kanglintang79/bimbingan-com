const META_PIXEL_ID = '1953837128501624'
const SCRIPT_ID = 'meta-pixel-script'

export function initMetaPixel() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  let createdFbq = false
  if (!window.fbq) {
    const fbq = function (...args) {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue.push(args)
    }

    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    window.fbq = fbq
    window._fbq = fbq
    createdFbq = true
  }

  const hasPixelScript = document.getElementById(SCRIPT_ID)
    || document.querySelector('script[src*="connect.facebook.net"][src*="fbevents.js"]')

  if (createdFbq && !hasPixelScript) {
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)
  }

  if (!window.__bimbinganMetaPixelInitialized) {
    window.fbq('init', META_PIXEL_ID)
    window.__bimbinganMetaPixelInitialized = true
  }
}

export function trackPageView() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView')
  }
}

export function trackPurchase(params) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return

  window.fbq('track', 'Purchase', {
    value: params.value,
    currency: 'IDR',
    content_name: params.content_name,
    content_category: 'Private Meta Ads Mentoring',
    content_type: 'service',
    contents: [{ id: params.id, quantity: 1, item_price: params.value }],
    ...(params.region ? { region: params.region } : {}),
  })
}

export function trackLead(params) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return

  window.fbq('track', 'Lead', {
    content_name: params.content_name,
    content_category: 'Private Meta Ads Mentoring',
    content_type: 'service',
  })
}
