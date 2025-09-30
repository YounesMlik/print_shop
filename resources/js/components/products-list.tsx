import { Link, } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useTranslation } from 'react-i18next'
import { SetRequired } from 'type-fest'
import { max, min, truncate } from 'lodash-es'
import { useMediaQuery } from '@mui/material'
import { asCurrency } from '@/components/helpers'

type ProductsListProps = { products: SetRequired<Product, "images" | "options">[] }
export function ProductsList({ products }: ProductsListProps) {
  const { t } = useTranslation();
  const is_mobile = useMediaQuery('(max-width:640px)');

  if (products.length === 0) {
    return <p className="text-muted-foreground text-center">{t("no_products_found")}</p>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (

        <Link href={route('products.show', product.id)} key={product.id}>
          <Card className='w-full h-full hover:outline-gray-500/50 hover:outline-2 flex max-sm:items-center max-sm:flex-row max-sm:h-40 max-sm:py-0'>
            <CardHeader className='gap-0 max-sm:min-w-40 max-sm:p-0'>
              {product.images.length === 0 ? "" :
                <AspectRatio className='' ratio={1}>
                  <img src={product.images[0].url} alt="product image" className="rounded-md w-full h-full object-cover max-sm:rounded-s-xl max-sm:rounded-e-none" />
                </AspectRatio>
              }
            </CardHeader>
            <CardContent className='max-sm:basis-2/3 max-sm:min-w-40 max-sm:ps-0'>
              <p className='font-semibold'>
                {product.name}
              </p>
              <p className='text-muted-foreground text-sm max-sm:truncate'>
                {product.description
                  && truncate(product.description, { length: 100, separator: " " })
                }
              </p>
              <ProductPrice product={product} />
            </CardContent>
          </Card>

        </Link>
      ))}
    </div>
  )
}

function ProductPrice({ product }: { product: SetRequired<Product, "options"> }) {
  const { t } = useTranslation()
  const prices = product.options.map(option => option.price);

  if (prices.length === 0) {
    return <p className='text-destructive text-sm'>{t("option_picker.no_options_available")}</p>;
  } else if (prices.length === 1) {
    return <p>{asCurrency(prices[0])}</p>;
  } else {
    const minimum = min(prices) as number
    const maximum = max(prices) as number
    return <p>{asCurrency(minimum)}-{asCurrency(maximum)}</p>;
  }
}