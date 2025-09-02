import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/_breadcrumb";
import { intersperse } from '@/components/helpers';

export function Breadcrumbs({ className, children, ...props }) {
  return (
    <Breadcrumb className={className} {...props} >
      <BreadcrumbList>
        {intersperse(
          children,
          (key) => <BreadcrumbSeparator key={key} />
        ).map((item, i) => (
          i % 2 === 1  // if Separator
            ? item(i)
            : <BreadcrumbItem key={i}>
              {i === children.length - 1
                ? <BreadcrumbPage>
                  {item}
                </BreadcrumbPage>
                : <BreadcrumbLink asChild>
                  {item}
                </BreadcrumbLink>
              }
            </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}