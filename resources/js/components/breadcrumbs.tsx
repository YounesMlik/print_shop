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
  const items = Array.prototype.concat(children)
    .map((children: ReactNode, i: number, arr: any[]) =>
      (i === arr.length - 1)  // if last
        ? BreadcrumbsPageFactory(children)
        : BreadcrumbsLinkFactory(children)
    )

  return (
    <Breadcrumb className={className} {...props} >
      <BreadcrumbList>
        {intersperse(
          items,
          BreadcrumbSeparator
        ).map((Item, key) => <Item key={key} />)}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function BreadcrumbsPageFactory(children: ReactNode) {
  return () => (
    <BreadcrumbItem>
      <BreadcrumbPage>
        {children}
      </BreadcrumbPage>
    </BreadcrumbItem>
  )
}

function BreadcrumbsLinkFactory(children: ReactNode) {
  return () => (
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        {children}
      </BreadcrumbLink>
    </BreadcrumbItem>
  )
}