import React, { useCallback, useEffect, useState } from 'react'
import { Head, router } from '@inertiajs/inertia-react'
import { ReactTags } from 'react-tag-autocomplete'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function ProductsIndex({ products, availableTags, filters }) {
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
    (tag) => {
      const updated = [...selected, tag]
      setSelected(updated)
      updateQuery(updated)
    },
    [selected]
  )

  const onDelete = useCallback(
    (index) => {
      const updated = selected.filter((_, i) => i !== index)
      setSelected(updated)
      updateQuery(updated)
    },
    [selected]
  )

  const updateQuery = (tags) => {
    const tagIds = tags.map(t => t.value)
    router.get(route('products.index'), { tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <>
      <Head title="Products" />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="tags">Filter by tags</Label>
          <ReactTags
            id="tags"
            labelText="Filter by tags"
            selected={selected}
            suggestions={suggestions}
            onAdd={onAdd}
            onDelete={onDelete}
            placeholderText="Select tags"
            allowNew={false}
          />
        </div>

        <Separator />

        {products.length === 0 ? (
          <p>No products found.</p>
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
      </div>
    </>
  )
}
