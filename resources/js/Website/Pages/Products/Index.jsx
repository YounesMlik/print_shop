import React, { useCallback, useEffect, useState } from 'react'
import { Head, router } from '@inertiajs/inertia-react'
import { ReactTags } from 'react-tag-autocomplete'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

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
            labelText="Product tags"
            selected={selectedTags}
            suggestions={tagSuggestions}
            onAdd={handleTagAdd}
            onDelete={handleTagDelete}
            allowNew={false}
            placeholderText="Add a tag"
            renderInput={({ classNames, inputWidth, ...props }) => (
              <Input
                {...props}
                className="w-full"
                style={{ width: inputWidth }}
              />
            )}
            renderTag={({ tag, classNames, ...props }) => (
              <div
                {...props}
                className="inline-flex items-center space-x-1 px-2 py-1 border rounded-md text-sm bg-muted text-muted-foreground"
              >
                <span>{tag.label}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="h-4 w-4 p-0"
                  aria-label={`Remove ${tag.label}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            renderListBox={({ children, classNames, ...props }) => (
              <div
                {...props}
                className="mt-1 border border-muted rounded-md shadow-sm bg-background text-sm"
              >
                {children}
              </div>
            )}
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
