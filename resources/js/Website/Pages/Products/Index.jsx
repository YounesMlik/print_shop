import React, { useCallback, useMemo, useState } from 'react'
import { Head, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import AsyncSelect from 'react-select/async'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export default function ProductsIndex({ products, availableTags, filters }) {
  const [selectedTags, setSelectedTags] = useState(
    (filters.tags || []).map(tag => ({
      value: tag.id,
      label: tag.name,
    }))
  )

  const tagOptions = useMemo(() => {
    return availableTags.map(tag => ({
      value: tag.id,
      label: tag.name,
    }))
  }, [availableTags])

  const filterTags = (inputValue) =>
    tagOptions.filter(tag =>
      tag.label.toLowerCase().includes(inputValue.toLowerCase())
    )

  const loadTagOptions = (inputValue) =>
    new Promise(resolve => {
      resolve(filterTags(inputValue))
    })

  const handleChange = (newValue) => {
    const updated = newValue || []
    setSelectedTags(updated)

    const tagIds = updated.map(tag => tag.value)

    Inertia.get(route('products.index'), { tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  const handlePagination = (url) => {
    const tagIds = selectedTags.map(tag => tag.value)

    Inertia.get(url, { tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <>
      <Head title="Products" />

      <section className="space-y-6">
        {/* Filters */}
        <div className="space-y-2">
          <Label htmlFor="product-tags">Filter by tags</Label>
          <AsyncSelect
            inputId="product-tags"
            isMulti
            defaultOptions={tagOptions}
            cacheOptions
            value={selectedTags}
            loadOptions={loadTagOptions}
            onChange={handleChange}
            placeholder="Select tags..."
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '0.375rem',
                borderColor: '#e2e8f0',
                padding: '2px',
                boxShadow: 'none',
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#f1f5f9',
                borderRadius: '0.375rem',
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: '#334155',
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: '#334155',
                ':hover': {
                  backgroundColor: '#e2e8f0',
                  color: '#1e293b',
                },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#e2e8f0' : 'white',
                color: '#0f172a',
              }),
              menu: (base) => ({
                ...base,
                zIndex: 20,
              }),
            }}
          />
        </div>

        <Separator />

        {/* Product list */}
        {products.data.length === 0 ? (
          <p className="text-muted-foreground">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.data.map(product => (
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

        {/* Pagination */}
        {products.last_page > 1 && (
          <div className="flex gap-2 flex-wrap mt-6">
            {products.links.map((link, i) => (
              <Button
                key={i}
                variant={link.active ? 'default' : 'outline'}
                disabled={!link.url}
                onClick={() => link.url && handlePagination(link.url)}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
