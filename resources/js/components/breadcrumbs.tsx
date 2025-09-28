import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/_breadcrumb";
import { intersperse } from '@/components/helpers';
import { ComponentProps, ReactNode } from "react";


type BreadcrumbsProps = ComponentProps<typeof Breadcrumb>
export function Breadcrumbs({ className, children, ...props }: BreadcrumbsProps) {
  const items = Array.prototype.concat(children).map(BreadcrumbFactory)

  return (
    <Breadcrumb className={className} {...props} >
      <BreadcrumbList>
        {intersperse(
          items,
          (key: number) => <BreadcrumbSeparator key={key} />
        ).map((item, i, arr) => item(i, arr))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function BreadcrumbFactory(item: ReactNode) {
  return (i: number, arr: any[]) => (
    <BreadcrumbItem key={i}>
      {i === arr.length - 1 // if last item
        ? <BreadcrumbPage>
          {item}
        </BreadcrumbPage>
        : <BreadcrumbLink asChild>
          {item}
        </BreadcrumbLink>
      }
    </BreadcrumbItem>
  )
}