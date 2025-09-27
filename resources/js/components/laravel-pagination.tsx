import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/_pagination'
import { useTranslation } from 'react-i18next';
import { NavData, NavEllipsis, NavLink, NavLinks } from '@/types/global';


type LaravelPaginationProps = {
  nav_data: NavData,
  onPageChange: (page: number) => void,
}
/**
 * Works with laravel pagination data
 */
export default function LaravelPagination({
  nav_data,
  onPageChange,
}: LaravelPaginationProps) {
  const { t } = useTranslation();
  const is_on_first_page = nav_data.links[0].url !== null
  const is_on_last_page = nav_data.links[nav_data.links.length - 1].url !== null
  const links = nav_data.links.slice(1, -1) as (NavLink | NavEllipsis)[]

  return (
    <Pagination>
      <PaginationContent>
        <PreviousPage current_page={nav_data.current_page} disabled={is_on_first_page} onPageChange={onPageChange} >
          {t("pagination.previous")}
        </PreviousPage>
        <Pages links={links} onPageChange={onPageChange} />
        <NextPage current_page={nav_data.current_page} disabled={is_on_last_page} onPageChange={onPageChange} >
          {t("pagination.next")}
        </NextPage>
      </PaginationContent>
    </Pagination>
  );
}


function PreviousPage(
  { disabled, current_page, onPageChange, ...props }
    : React.ComponentProps<typeof PaginationPrevious>
    & {
      disabled: boolean,
      current_page: number,
      onPageChange: (page: number) => void,
    }
) {
  return (
    <PaginationItem>
      {disabled ? (
        <PaginationPrevious className='cursor-pointer' onClick={() => onPageChange(current_page - 1)} {...props} />
      ) : (
        <PaginationPrevious {...props} />
      )}
    </PaginationItem>
  );
};

function NextPage(
  { disabled, current_page, onPageChange, ...props }
    : React.ComponentProps<typeof PaginationNext>
    & {
      disabled: boolean,
      current_page: number,
      onPageChange: (page: number) => void,
    }
) {
  return (
    <PaginationItem>
      {disabled ? (
        <PaginationNext className='cursor-pointer' onClick={() => onPageChange(current_page + 1)} {...props} />
      ) : (
        <PaginationNext {...props} />
      )}
    </PaginationItem>
  );
};

function Pages({ links, onPageChange }: { links: (NavLink | NavEllipsis)[], onPageChange: (page: number) => void }) {
  return links
    .map((link, i) => (
      <PaginationItem key={i}>
        {
          link.label === "..." ?
            <PaginationEllipsis />
            :
            <PaginationLink
              className={link.active ? '' : 'cursor-pointer'}
              isActive={link.active}
              aria-current={link.active ? "page" : undefined}
              onClick={() => onPageChange(parseInt(link.label))}
            >
              {link.label}
            </PaginationLink>
        }
      </PaginationItem>
    ))
};