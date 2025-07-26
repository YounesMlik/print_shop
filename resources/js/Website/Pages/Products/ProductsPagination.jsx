import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function ProductsPagination({
  currentPage,
  lastPage,
  prevPageUrl,
  nextPageUrl,
  selectedTags,
  onPageChange,
}) {
  const buildPageUrl = (page) => {
    const tagIds = selectedTags.map(t => t.value)
    return route('products.index', { page, tags: tagIds })
  }

  const generatePageNumbers = () => {
    const pages = []
    const siblingsCount = 1
    const startPage = Math.max(2, currentPage - siblingsCount)
    const endPage = Math.min(lastPage - 1, currentPage + siblingsCount)

    pages.push(1)

    if (startPage > 2) {
      pages.push('start-ellipsis')
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page)
    }

    if (endPage < lastPage - 1) {
      pages.push('end-ellipsis')
    }

    if (lastPage > 1) {
      pages.push(lastPage)
    }

    return pages
  }

  const handleClick = (page, event) => {
    event.preventDefault()
    if (page !== currentPage) {
      onPageChange(page)
    }
  }

  const renderPageItem = (page, index) => {
    if (page === 'start-ellipsis' || page === 'end-ellipsis') {
      return (
        <PaginationItem key={`${page}-${index}`}>
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    return (
      <PaginationItem key={page}>
        <PaginationLink
          href={buildPageUrl(page)}
          isActive={page === currentPage}
          onClick={(e) => handleClick(page, e)}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    )
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={prevPageUrl ? buildPageUrl(currentPage - 1) : undefined}
            disabled={!prevPageUrl}
            onClick={(e) => {
              e.preventDefault()
              if (prevPageUrl) onPageChange(currentPage - 1)
            }}
          />
        </PaginationItem>

        {generatePageNumbers().map(renderPageItem)}

        <PaginationItem>
          <PaginationNext
            href={nextPageUrl ? buildPageUrl(currentPage + 1) : undefined}
            disabled={!nextPageUrl}
            onClick={(e) => {
              e.preventDefault()
              if (nextPageUrl) onPageChange(currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
