import React, { useCallback, useEffect, useState } from 'react'
import { Head, router } from '@inertiajs/inertia-react'
import { ReactTags } from 'react-tag-autocomplete'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'

export default function ProductsIndex({ products, availableTags, filters }) {
  // Convert incoming filters.tags (array of { value, label }) to react-tag-autocomplete format
  const [selected, setSelected] = useState(filters.tags || [])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    setSuggestions(
      availableTags.map(tag => ({
        value: tag.id,
        label: tag.name,
      }))
    )
  }, [availableTags])

  const onAdd = useCallback(
    tag => {
      const updated = [...selected, tag]
      setSelected(updated)
      updateQuery(updated)
    },
    [selected]
  )

  const onDelete = useCallback(
    index => {
      const updated = [...selected]
      updated.splice(index, 1)
      setSelected(updated)
      updateQuery(updated)
    },
    [selected]
  )

  // Update URL query params without page reload, preserve state and scroll
  const updateQuery = (tags) => {
    const tagIds = tags.map(t => t.value)
    router.get(route('products.index'), { tags: tagIds }, { preserveState: true, preserveScroll: true })
  }

  return (
    <>
      <Head title="Products" />
      <div className="container mx-auto px-4 py-8">
        <Heading size="lg" className="mb-6">
          Products
        </Heading>

        <div className="mb-8 max-w-xl">
          <ReactTags
            labelText="Filter products by tags"
            selected={selected}
            suggestions={suggestions}
            onAdd={onAdd}
            onDelete={onDelete}
            noOptionsText="No matching tags"
            allowNew={false}
            placeholderText="Add a tag"
          />
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found for the selected tags.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                {product.description && <p className="text-gray-600 mt-2">{product.description}</p>}
                {/* Add buttons, links, images, etc. here using shadcn/ui components if needed */}
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
