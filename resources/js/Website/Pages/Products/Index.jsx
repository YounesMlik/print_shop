import { useMemo, useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import LaravelPagination from '@/components/laravel-pagination'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/_breadcrumb";
import { useTranslation } from 'react-i18next'
import mapValues from 'lodash/mapValues'
import SortPicker from '@/components/sort-picker'
import { FilterSection } from '@/components/filter-section';
import { ProductsList } from '@/components/products-list';

export default function ProductsIndex({ products_collection, availableTags, filters, category_filtering_level }) {
  const { t } = useTranslation();
  const nav_data = products_collection.meta
  const products = products_collection.data
  availableTags = availableTags.data
  filters = mapValues(filters, item => item?.data)

  const [selectedTags, setSelectedTags] = useState(mapTagsToSelectFormat(filters.tags))

  const tagOptions = useMemo(() => mapTagsToSelectFormat(availableTags), [availableTags])

  function mapTagsToSelectFormat(tags = []) {
    return tags.map(tag => ({
      value: tag.id,
      label: tag.name,
    }))
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

    if (page != nav_data.current_page) {
      router.get(route('products.index'), { page, tags: tagIds }, {
        preserveState: true,
        preserveScroll: true,
      })
    }
  }

  return (
    <>
      {category_filtering_level !== 0 ? "" : <Head title={t("products")} />}
      {/* {category_filtering_level !== 1 ? "" : <Head title={filters.super_category.name} />} */}
      {/* {category_filtering_level !== 2 ? "" : <Head title={filters.category.name} />} */}

      <section className="grid gap-6">

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {category_filtering_level === 0 ?
                <BreadcrumbPage>
                  {t("products")}
                </BreadcrumbPage>
                :
                <BreadcrumbLink asChild>
                  <Link href={route('products.index')} >
                    {t("products")}
                  </Link>
                </BreadcrumbLink>
              }
            </BreadcrumbItem>
            {/* {!filters.super_category ? "" :
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
            } */}
            {/* {!filters.category ? "" :
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
            } */}
          </BreadcrumbList>
        </Breadcrumb>

        <FilterSection
          selectedTags={selectedTags}
          tagOptions={tagOptions}
          loadTagOptions={loadTagOptions}
          onChange={handleTagChange}
        />

        <div className="mb-4 flex flex-row-reverse items-center justify-between">
          {/* <h1 className="text-xl font-semibold">Products</h1> */}
          <SortPicker initialSort={filters?.sort} initialDir={filters?.dir} />
        </div>
        <Separator />

        <ProductsList products={products} />

        {nav_data.last_page > 1 && (
          <LaravelPagination
            nav_data={nav_data}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </>
  )
}
