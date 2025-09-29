import { Head, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { ProductsTagFilter } from '@/components/products-tag-filter';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ResourceCollection } from '@/types/global';
import { SetRequired } from 'type-fest';


type ProductsIndexProps = {
  products_collection: ResourceCollection<SetRequired<Product, "images">>,
  available_tags: ResourceCollection<Tag>,
  current_tags: ResourceCollection<Tag>,
}
export default function ProductsIndex({ products_collection, available_tags, current_tags }: ProductsIndexProps) {
  const { t } = useTranslation();
  const nav_data = products_collection.meta
  const products = products_collection.data
  const my_available_tags = available_tags.data
  const my_current_tags = current_tags.data

  function handleTagChange(tags: Tag[]) {
    const tagIds = tags.map(tag => tag.id)


    router.get(route(route().current() as string), { tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  function handlePageChange(page: number, selectedTags: Tag[]) {
    const tagIds = selectedTags.map(t => t.id)

    router.get(route(route().current() as string), { page, tags: tagIds }, {
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
          available_tags={my_available_tags}
          current_tags={my_current_tags}
          handleTagChange={handleTagChange}
          nav_data={nav_data}
          handlePageChange={handlePageChange}
        />

      </section>
    </>
  )
}
