import { Link, } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useTranslation } from 'react-i18next'
import { SetRequired } from 'type-fest'
import { max, min, truncate } from 'lodash-es'
import { useMediaQuery } from '@mui/material'
import { asCurrency, asCurrencyRange } from '@/components/helpers'
import { Button } from '@/components/ui/button'
import { shoppingCart } from '@/components/shopping-cart/shopping-cart-store'
import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type MyProduct = Omit<SetRequired<Product, 'images'>, 'options'> & {
  options: SetRequired<Option, 'option_attributes'>[]
}
type ProductsListProps = { products: MyProduct[] }
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
          <Card className='w-full h-full flex rounded-3xl max-sm:rounded-2xl max-sm:items-center max-sm:flex-row max-sm:py-0 max-sm:text-sm max-sm:gap-0 hover:outline-gray-500/50 hover:outline-2'>
            <CardHeader className='gap-0 max-sm:min-w-3/7 max-sm:p-0'>
              {product.images.length === 0 ? "" :
                <AspectRatio className='' ratio={1}>
                  <img src={product.images[0].url} alt="product image" className="rounded-md w-full h-full object-cover max-sm:rounded-s-xl max-sm:rounded-e-none" />
                </AspectRatio>
              }
            </CardHeader>
            <CardContent className='h-full flex flex-col justify-between gap-4 max-sm:gap-0 max-sm:basis-4/7 max-sm:ps-0 max-sm:pt-1 max-sm:pe-0'>
              <div className='flex flex-col max-sm:gap-0 max-sm:px-2'>
                <p className='font-semibold line-clamp-3'>
                  {product.name}
                </p>
                <p className='text-muted-foreground text-sm max-sm:hidden'>
                  {product.description
                    && truncate(product.description, { length: 100, separator: " " })
                  }
                </p>
              </div>
              <div className='flex flex-col'>
                <ProductPrice className='self-end-safe pe-2' product={product} />
                {/* {product.options.length === 1 &&   // TODO: remove link from the whole card to prevent "interactive content descendant"
                  <Button
                    onClick={(e) => {
                      shoppingCart.add(product, product.options[0], 1)
                      e.stopPropagation()
                    }}
                  >
                    {t("shopping_cart.add")}
                  </Button>
                } */}
                {product.options.length > 0 &&
                  <Button className='max-sm:rounded-s-none max-sm:rounded-se-none' variant="secondary">
                    {t("products_list.see_options")}
                    <div className='text-muted-foreground'>({product.options.length})</div>
                  </Button>
                }
              </div>
            </CardContent>
          </Card>

        </Link>
      ))}
    </div>
  )
}

function ProductPrice({ product, className, ...props }: ComponentProps<"p"> & { product: SetRequired<Product, "options"> }) {
  const { t } = useTranslation()
  const prices = product.options.map(option => option.price);

  if (prices.length === 0) {
    return (
      <p className={cn('text-destructive text-sm', className)} {...props}>
        {t("option_picker.no_options_available")}
      </p>
    );
  } else if (prices.length === 1) {
    return (
      <p className={className} {...props}>
        {asCurrency(prices[0])}
      </p>
    );
  } else {
    const minimum = min(prices) as number
    const maximum = max(prices) as number
    return (
      <p className={cn("w-full flex justify-between ps-2", className)} {...props}>
        <span className='text-muted-foreground'>{t("products_list.price_starting_from")}</span>
        <span>{asCurrency(minimum)}</span>
      </p>
    );
  }
}