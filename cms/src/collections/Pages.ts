import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'hero',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'cards',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                },
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    { label: 'Black', value: 'black' },
                    { label: 'White', value: 'white' },
                  ],
                },
              ],
            },
          ],
        },
        {
          slug: 'productCarousel',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'products',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
            },
          ],
        },
        {
          slug: 'textSection',
          fields: [
            {
              name: 'content',
              type: 'richText',
            },
            {
                name: 'align',
                type: 'select',
                options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Center', value: 'center' },
                ]
            }
          ],
        },
      ],
    },
  ],
}
