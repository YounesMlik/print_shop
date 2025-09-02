import { Head, Link, router } from '@inertiajs/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/_breadcrumb";
import { useTranslation } from 'react-i18next'
import { ProductsTagFilter } from '@/components/products-tag-filter';

export default function ProductsIndex({ products_collection, category_resource, available_tags, current_tags }) {
  const { t } = useTranslation();
  const nav_data = products_collection.meta
  const products = products_collection.data
  const category = category_resource.data
  available_tags = available_tags.data
  current_tags = current_tags.data

  function handleTagChange(tags) {
    const tagIds = tags.map(tag => tag.value)

    router.get(route(route().current(), { category: category.id }), { tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  function handlePageChange(page, selectedTags) {
    const tagIds = selectedTags.map(t => t.value)

    router.get(route(route().current(), { category: category.id }), { page, tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <>
      <Head title={filters.category.name} />

      <section className="grid gap-6">

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={route('products.index')} >
                  {t("products")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={route('super-categories.show', { super_category: filters.super_category.id, })} >
                  {filters.super_category.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>
                {filters.category.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
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
