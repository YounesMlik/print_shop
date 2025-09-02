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
        ).map((item, i, arr) => (
          i % 2 === 1  // if Separator
            ? item(i)
            : <BreadcrumbItem key={i}>
              {i === arr.length - 1 // if last item
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