import LaravelPagination from '@/components/laravel-pagination'
import { Separator } from '@/components/ui/separator'
import SortPicker from '@/components/sort-picker'
import { FilterSection } from '@/components/filter-section';
import { ProductsList } from '@/components/products-list';
import { useMemo, useState } from 'react';

export function ProductsTagFilter({ products, available_tags, current_tags, handleTagChange, nav_data, handlePageChange }) {
  const tagOptions = useMemo(() => mapTagsToSelectFormat(available_tags), [available_tags])
  const [selectedTags, setSelectedTags] = useState(mapTagsToSelectFormat(current_tags))

  function handleTagChange_local(newTags) {
    const tags = newTags || []
    setSelectedTags(tags)
    const tagIds = tags.map(tag => tag.value)

    handleTagChange(tags)
  }

  function handlePageChange_local(page) {
    if (page != nav_data.current_page) {
      handlePageChange(page, selectedTags)
    }
  }

  return (
    <>
      <FilterSection
        selectedTags={selectedTags}
        tagOptions={tagOptions}
        onChange={handleTagChange_local}
      />

      <div className="mb-4 flex flex-row-reverse items-center justify-between">
        {/* <h1 className="text-xl font-semibold">Products</h1> */}
        <SortPicker
        // initialSort={filters?.sort} 
        // initialDir={filters?.dir} 
        />
      </div>
      <Separator />

      <ProductsList products={products} />

      {nav_data.last_page > 1 && (
        <LaravelPagination
          nav_data={nav_data}
          onPageChange={handlePageChange_local}
        />
      )}
    </>
  )
}

function mapTagsToSelectFormat(tags = []) {
  return tags.map(tag => ({
    value: tag.id,
    label: tag.name,
  }))
}