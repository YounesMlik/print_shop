import { Head, Link, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { ProductsTagFilter } from '@/components/products-tag-filter';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Resource, ResourceCollection } from '@/types/global';
import { SetRequired } from 'type-fest';


type SuperCategoryShowProps = {
  products_collection: ResourceCollection<SetRequired<Product, "images">>,
  super_category_resource: Resource<SuperCategory>,
  available_tags: ResourceCollection<Tag>,
  current_tags: ResourceCollection<Tag>,
}
export default function SuperCategoryShow({ products_collection, super_category_resource, available_tags, current_tags }: SuperCategoryShowProps) {
  const { t } = useTranslation();
  const nav_data = products_collection.meta
  const products = products_collection.data
  const super_category = super_category_resource.data
  const my_available_tags = available_tags.data
  const my_current_tags = current_tags.data

  function handleTagChange(tags: Tag[]) {
    const tagIds = tags.map(tag => tag.id)

    router.get(route(route().current() as string, { super_category: super_category.id }), { tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  function handlePageChange(page: number, selectedTags: Tag[]) {
    const tagIds = selectedTags.map(t => t.id)

    router.get(route(route().current() as string, { super_category: super_category.id }), { page, tags: tagIds }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <>
      <Head title={super_category.name} />

      <section className="grid gap-6">

        <Breadcrumbs>
          <Link href={route('products.index')} >
            {t("products")}
          </Link>
          <span>
            {super_category.name}
          </span>
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
