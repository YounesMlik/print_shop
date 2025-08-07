import React, { useMemo, useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import AsyncSelect from 'react-select/async'

import ProductsPagination from './ProductsPagination'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function ProductsIndex({ products_collection, availableTags, filters, category_filtering_level }) {
  const [selectedTags, setSelectedTags] = useState(mapTagsToSelectFormat(filters.tags))

  const tagOptions = useMemo(() => mapTagsToSelectFormat(availableTags), [availableTags])

  function mapTagsToSelectFormat(tags = []) {
    return tags.map(tag => ({
      value: tag.id,
      label: tag.name,
    }))
  }

  function filterTagsByInput(inputValue) {
    const lowerInput = inputValue.toLowerCase()
    return tagOptions.filter(tag => tag.label.toLowerCase().includes(lowerInput))
  }

  function loadTagOptions(inputValue) {
    return Promise.resolve(filterTagsByInput(inputValue))
  }

  function handleTagChange(newTags) {
    const tags = newTags || []
    setSelectedTags(tags)
    const tagIds = tags.map(tag => tag.value)

    router.get(route('products.index'), { tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  function handlePageChange(page) {
    const tagIds = selectedTags.map(t => t.value)

    router.get(route('products.index'), { page, tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  const {
    current_page,
    last_page,
    prev_page_url,
    next_page_url,
    data: productData = products,
  } = products_collection.meta

  const products = products_collection.data

  return (
    <>
      <Head title="Products" />

      <section className="grid gap-6">

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {category_filtering_level === 0 ?
                <BreadcrumbPage>
                  Products
                </BreadcrumbPage>
                :
                <BreadcrumbLink asChild>
                  <Link href={route('products.index')} >
                    Products
                  </Link>
                </BreadcrumbLink>
              }
            </BreadcrumbItem>
            {filters.super_category === null ? "" :
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {category_filtering_level === 1 ?
                    <BreadcrumbPage>
                      {filters.super_category.name}
                    </BreadcrumbPage>
                    :
                    <BreadcrumbLink asChild>
                      <Link href={route('products.index', { super_category: filters.super_category.id, })} >
                        {filters.super_category.name}
                      </Link>
                    </BreadcrumbLink>
                  }

                </BreadcrumbItem>
              </>
            }
            {filters.category === null ? "" :
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {category_filtering_level === 2 ?
                    <BreadcrumbPage>
                      {filters.category.name}
                    </BreadcrumbPage>
                    :
                    <BreadcrumbLink asChild>
                      <Link href={route('products.index', { category: filters.category.id, })} >
                        {filters.category.name}
                      </Link>
                    </BreadcrumbLink>
                  }

                </BreadcrumbItem>
              </>
            }
          </BreadcrumbList>
        </Breadcrumb>

        <FilterSection
          selectedTags={selectedTags}
          tagOptions={tagOptions}
          loadTagOptions={loadTagOptions}
          onChange={handleTagChange}
        />

        <Separator />

        <ProductList products={productData} />

        {last_page > 1 && (
          <ProductsPagination
            currentPage={current_page}
            lastPage={last_page}
            prevPageUrl={prev_page_url}
            nextPageUrl={next_page_url}
            selectedTags={selectedTags}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </>
  )
}

function FilterSection({ selectedTags, tagOptions, loadTagOptions, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="product-tags">Filter by tags</Label>
      <AsyncSelect
        inputId="product-tags"
        isMulti
        defaultOptions={tagOptions}
        cacheOptions
        value={selectedTags}
        loadOptions={loadTagOptions}
        onChange={onChange}
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
  )
}

function ProductList({ products }) {
  if (products.length === 0) {
    return <p className="text-muted-foreground">No products found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (

        <Link href={route('products.show', product.id)} key={product.id}>
          <Card className='w-full h-full hover:outline-gray-500/50 hover:outline-2'>
            <CardHeader>
              <CardTitle>
                {product.name}
              </CardTitle>
              {product.images.length === 0 ? "" :
                <AspectRatio ratio={1}>
                  <img src={product.images[0].url} alt="product image" className="rounded-md w-full h-full object-contain" />
                </AspectRatio>
              }

            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
