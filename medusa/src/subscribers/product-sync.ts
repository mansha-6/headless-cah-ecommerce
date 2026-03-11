import { 
  type SubscriberConfig, 
  type SubscriberArgs,
} from "@medusajs/framework"
import { Modules } from "@medusajs/utils"
import axios from "axios"

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3000/api'
const PAYLOAD_API_TOKEN = process.env.PAYLOAD_API_TOKEN || ''

export default async function productSyncHandler({ 
  event, 
  container 
}: SubscriberArgs<any>) {
  const productModuleService: any = container.resolve(Modules.PRODUCT)
  const productId = event.data.id

  if (!productId) return

  try {
    const product = await productModuleService.retrieve(productId)

    // Sync to Payload
    const payloadData = {
      title: product.title,
      slug: product.handle,
      description: product.description,
      medusaId: product.id,
      // Map other fields
    }

    // Check if exists in Payload
    const checkResponse = await axios.get(`${PAYLOAD_API_URL}/products?where[medusaId][equals]=${product.id}`, {
      headers: {
        'Authorization': `users API-Key ${PAYLOAD_API_TOKEN}`,
        'x-source': 'medusa'
      }
    })

    if (checkResponse.data.docs.length > 0) {
      const payloadId = checkResponse.data.docs[0].id
      await axios.patch(`${PAYLOAD_API_URL}/products/${payloadId}`, payloadData, {
        headers: {
          'Authorization': `users API-Key ${PAYLOAD_API_TOKEN}`,
          'x-source': 'medusa'
        }
      })
    } else {
      await axios.post(`${PAYLOAD_API_URL}/products`, payloadData, {
        headers: {
          'Authorization': `users API-Key ${PAYLOAD_API_TOKEN}`,
          'x-source': 'medusa'
        }
      })
    }
  } catch (error) {
    console.error('Error syncing to Payload:', error.response?.data || error.message)
  }
}

export const config: SubscriberConfig = {
  event: ["product.created", "product.updated"],
  context: {
    subscriberId: "product-sync-handler",
  },
}
