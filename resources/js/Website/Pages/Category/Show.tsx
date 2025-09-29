import { Head, Link, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { ProductsTagFilter } from '@/components/products-tag-filter';
import { Breadcrumbs } from '@/components/breadcrumbs';

export default function CategoryShow({ products_collection, category_resource, available_tags, current_tags }) {
  const { t } = useTranslation();
  const nav_data = products_collection.meta
  const products = products_collection.data
  const category = category_resource.data
  available_tags = available_tags.data
  current_tags = current_tags.data


  function handleTagChange(tags) {
    const tagIds = tags.map(tag => tag.id)

    router.get(route(route().current(), { category: category.id }), { tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  function handlePageChange(page, selectedTags) {
    const tagIds = selectedTags.map(t => t.id)

    router.get(route(route().current(), { category: category.id }), { page, tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <>
      <Head title={category.name} />

      <section className="grid gap-6">
        <Breadcrumbs>
          <Link href={route('products.index')} >
            {t("products")}
          </Link>

          <Link href={route('super-categories.show', { super_category: category.super_category.id, })} >
            {category.super_category.name}
          </Link>

          <span>
            {category.name}
          </span>
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
