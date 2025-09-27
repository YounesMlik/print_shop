
import { Link, } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useTranslation } from 'react-i18next'
import { SetRequired } from 'type-fest'

type ProductsListProps = { products: SetRequired<Product, "images">[] }
export function ProductsList({ products }: ProductsListProps) {
  const { t } = useTranslation();
  if (products.length === 0) {
    return <p className="text-muted-foreground">{t("no_products_found")}</p>
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
