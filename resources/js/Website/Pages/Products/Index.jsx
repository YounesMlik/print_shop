import React, { useCallback, useEffect, useState } from 'react'
import { Head, router } from '@inertiajs/inertia-react'
import { ReactTags } from 'react-tag-autocomplete'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function ProductsIndex({ products, availableTags, filters }) {
  const [selectedTags, setSelectedTags] = useState(filters.tags || [])
  const [tagSuggestions, setTagSuggestions] = useState([])

  useEffect(() => {
    setTagSuggestions(
      availableTags.map(tag => ({
        value: tag.id,
        label: tag.name,
      }))
    )
  }, [availableTags])

  const handleTagAdd = useCallback(
    (tag) => {
      const updated = [...selectedTags, tag]
      setSelectedTags(updated)
      applyTagFilter(updated)
    },
    [selectedTags]
  )

  const handleTagDelete = useCallback(
    (index) => {
      const updated = selectedTags.filter((_, i) => i !== index)
      setSelectedTags(updated)
      applyTagFilter(updated)
    },
    [selectedTags]
  )

  const applyTagFilter = (tags) => {
    const tagIds = tags.map(t => t.value)
    router.get(route('products.index'), { tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <>
      <Head title="Products" />
      <section className="space-y-6">
        {/* Filter */}
        <div className="space-y-2">
          <Label htmlFor="product-tags">Filter by tags</Label>
          <ReactTags
            id="product-tags"
            labelText="Filter by tags"
            selected={selectedTags}
            suggestions={tagSuggestions}
            onAdd={handleTagAdd}
            onDelete={handleTagDelete}
            placeholderText="Add a tag"
            allowNew={false}
          />
        </div>

        <Separator />

        {/* Product List */}
        {products.length === 0 ? (
          <p className="text-muted-foreground">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
