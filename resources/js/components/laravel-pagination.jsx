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


/**
 * Works with laravel pagination data
 */
export default function LaravelPagination({
  nav_data,
  onPageChange,
}) {
  const is_on_first_page = nav_data.links[0].url !== null
  const is_on_last_page = nav_data.links[nav_data.links.length - 1].url !== null
  const links = nav_data.links.slice(1, -1)

  return (
    <Pagination>
      <PaginationContent>
        <PreviousPage current_page={nav_data.current_page} disabled={is_on_first_page} onPageChange={onPageChange} />
        <Pages links={links} onPageChange={onPageChange} />
        <NextPage current_page={nav_data.current_page} disabled={is_on_last_page} onPageChange={onPageChange} />
      </PaginationContent>
    </Pagination>
  );
}


function PreviousPage({ disabled, current_page, onPageChange }) {
  return (
    <PaginationItem>
      {disabled ? (
        <PaginationPrevious className='cursor-pointer' onClick={() => onPageChange(current_page - 1)} />
      ) : (
        <PaginationPrevious disabled />
      )}
    </PaginationItem>
  );
};

function NextPage({ disabled, current_page, onPageChange }) {
  return (
    <PaginationItem>
      {disabled ? (
        <PaginationNext className='cursor-pointer' onClick={() => onPageChange(current_page + 1)} />
      ) : (
        <PaginationNext disabled />
      )}
    </PaginationItem>
  );
};

function Pages({ links, onPageChange }) {
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