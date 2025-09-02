import { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/_breadcrumb";
import { useTranslation } from 'react-i18next'
import { ProductsTagFilter } from '@/components/products-tag-filter';

export default function ProductsIndex({ products_collection, available_tags, current_tags, category_filtering_level }) {
  const { t } = useTranslation();
  const nav_data = products_collection.meta
  const products = products_collection.data
  available_tags = available_tags.data
  current_tags = current_tags.data

  function handleTagChange(tags) {
    const tagIds = tags.map(tag => tag.value)

    router.get(route('products.index'), { tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  function handlePageChange(page, selectedTags) {
    const tagIds = selectedTags.map(t => t.value)

    router.get(route('products.index'), { page, tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
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

        <ProductsTagFilter
          products={products}
          available_tags={available_tags}
          current_tags={current_tags}
          handleTagChange={handleTagChange}
          nav_data={nav_data}
          handlePageChange={handlePageChange}
        />

      </section>
    </>
  )
}
