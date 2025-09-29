import LaravelPagination from '@/components/laravel-pagination'
import { Separator } from '@/components/ui/separator'
import SortPicker from '@/components/sort-picker'
import { FilterSection } from '@/components/filter-section';
import { ProductsList } from '@/components/products-list';
import { useMemo, useState } from 'react';
import { NavData } from '@/types/global';
import { SetRequired } from 'type-fest';


type ProductsTagFilterProps = {
  products: SetRequired<Product, "images">[],
  available_tags: Tag[],
  current_tags: Tag[],
  handleTagChange: (tags: Tag[]) => void,
  nav_data: NavData,
  handlePageChange: (page: number, selectedTags: Tag[]) => void,
}
export function ProductsTagFilter({ products, available_tags, current_tags, handleTagChange, nav_data, handlePageChange }: ProductsTagFilterProps) {
  const [selectedTags, setSelectedTags] = useState(current_tags)

  function handleTagChange_local(newTags: Tag[]) {
    const tags = newTags || []
    setSelectedTags(tags)

    handleTagChange(tags)
  }

  function handlePageChange_local(page: number) {
    if (page != nav_data.current_page) {
      handlePageChange(page, selectedTags)
    }
  }

  return (
    <>
      <FilterSection
        selectedTags={selectedTags}
        tagOptions={available_tags}
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