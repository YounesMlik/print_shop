import { Head, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { ProductsTagFilter } from '@/components/products-tag-filter';
import { Breadcrumbs } from '@/components/breadcrumbs';

export default function ProductsIndex({ products_collection, available_tags, current_tags }) {
  const { t } = useTranslation();
  const nav_data = products_collection.meta
  const products = products_collection.data
  available_tags = available_tags.data
  current_tags = current_tags.data

  function handleTagChange(tags) {
    const tagIds = tags.map(tag => tag.value)

    router.get(route(route().current()), { tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  function handlePageChange(page, selectedTags) {
    const tagIds = selectedTags.map(t => t.value)

    router.get(route(route().current()), { page, tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <>
      <Head title={t("products")} />

      <section className="grid gap-6">

        <Breadcrumbs>
          <span>{t("products")}</span>
        </Breadcrumbs>

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
