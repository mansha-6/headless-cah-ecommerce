import type { CollectionAfterChangeHook } from 'payload'
import axios from 'axios'

const MEDUSA_API_URL = process.env.MEDUSA_API_URL || 'http://localhost:9000'
const MEDUSA_API_TOKEN = process.env.MEDUSA_API_TOKEN || ''

export const syncToMedusa: CollectionAfterChangeHook = async ({
  doc, // full document data
  operation, // name of the operation ie. 'create', 'update'
  req, // full express request
}) => {
  // Prevent circular sync if the update came from Medusa
  const headers = req.headers as any
  if (headers && headers['x-source'] === 'medusa') {
    return doc
  }

  try {
    const productData = {
      title: doc.title,
      description: doc.description,
      handle: doc.slug,
      status: 'published',
    }

    if (operation === 'create' && !doc.medusaId) {
      const response = await axios.post(`${MEDUSA_API_URL}/admin/products`, productData, {
        headers: {
          'Authorization': `Bearer ${MEDUSA_API_TOKEN}`,
          'Content-Type': 'application/json',
          'x-source': 'payload'
        }
      })
      
      const medusaProduct = response.data.product
      
      await req.payload.update({
        collection: 'products' as any,
        id: doc.id,
        data: {
          medusaId: medusaProduct.id
        },
        overrideAccess: true,
      })
    } else if (operation === 'update' && doc.medusaId) {
      await axios.post(`${MEDUSA_API_URL}/admin/products/${doc.medusaId}`, productData, {
        headers: {
          'Authorization': `Bearer ${MEDUSA_API_TOKEN}`,
          'Content-Type': 'application/json',
          'x-source': 'payload'
        }
      })
    }
  } catch (error: any) {
    console.error('Error syncing to Medusa:', error.response?.data || error.message)
  }

  return doc
}
