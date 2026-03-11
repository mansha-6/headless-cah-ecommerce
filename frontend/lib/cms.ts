const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000/api'

export async function fetchCMS(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${PAYLOAD_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    console.error(`Payload API Error: ${res.status}`, error)
    return null
  }

  return res.json()
}

export async function getPage(slug: string) {
  const data = await fetchCMS(`/pages?where[slug][equals]=${slug}`)
  return data?.docs?.[0] || null
}

export async function getProducts() {
  const data = await fetchCMS('/products')
  return data?.docs || []
}

export async function getProduct(slug: string) {
  const data = await fetchCMS(`/products?where[slug][equals]=${slug}`)
  return data?.docs?.[0] || null
}
