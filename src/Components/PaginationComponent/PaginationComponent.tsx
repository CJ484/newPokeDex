import { useState } from 'react';
import fetchPokemonData from '@/api/fetchData';
import { Field, FieldLabel } from '../ui/field';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '../ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from '../ui/pagination';
import './PaginationComponent.scss';
import { PokemonExtendedData } from '@/types/pokemonTypes';

type PaginationComponentProps = {
  totalCount: number;
  nextPage: string;
  previousPage: string;
  setData: (data: PokemonExtendedData[]) => void;
  setTotalCount: (totalCount: number) => void;
  setNextPage: (nextPage: string) => void;
  setPreviousPage: (previousPage: string) => void;
}

export default function PaginationComponent({ totalCount, nextPage, previousPage, setData, setTotalCount, setNextPage, setPreviousPage }: PaginationComponentProps) {
    const pageLimitOptions = [10, 20, 50, 100];
    const [selectedPageLimit, setSelectedPageLimit] = useState(20);
    const pageCeiling = Math.ceil(totalCount / selectedPageLimit);

    const getCurrentPage = () => {
      if (!previousPage) return 1;

      try {
        const url = new URL(previousPage);
        const previousOffset = parseInt(url.searchParams.get('offset') || "0", 10);
        const prevLimit = parseInt(url.searchParams.get('limit') || selectedPageLimit.toString(), 10);

        return Math.floor(previousOffset / prevLimit) + 2;
      } catch {
        return 1;
      }
    };
    const currentPage = getCurrentPage();

    const setPageRanges = () => {
      const pageRanges: (number | string)[] = [];
      const totalNumbers = 5; // window size

      if (pageCeiling <= totalNumbers + 2) {
        // Show all pages if not too many
        for (let i = 1; i <= pageCeiling; i++) pageRanges.push(i);
      } else {
        // Always show first, maybe dots, middle range, maybe dots, last
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(pageCeiling - 1, currentPage + 1);

        if (currentPage <= 3) {
          start = 2;
          end = 4;
        }
        if (currentPage >= pageCeiling - 2) {
          start = pageCeiling - 3;
          end = pageCeiling - 1;
        }

        pageRanges.push(1);
        if (start > 2) {
          pageRanges.push('...');
        }
        for (let i = start; i <= end; i++) {
          pageRanges.push(i);
        }
        if (end < pageCeiling - 1) {
          pageRanges.push('...');
        }
        if (pageCeiling > 1) {
          pageRanges.push(pageCeiling);
        }
      }

      return pageRanges;
    };

    const pageRanges = setPageRanges();

    const fetchPage = async (url: string) => {
      if (!url) return;
      const fetchedData = await fetchPokemonData(url);
      setData(fetchedData?.results || []);
      setTotalCount(fetchedData?.count || 0);
      setNextPage(fetchedData?.next || '');
      setPreviousPage(fetchedData?.previous || '');
    };

    const buildPageUrl = (page: number, pageLimit: number) => {
      const offset = (page - 1) * pageLimit;
      return `${import.meta.env.VITE_POKE_API}?offset=${offset}&limit=${pageLimit}`;
    };

    const handlePageChange = async (page: string | number) => {
      if (typeof page === 'number') {
        await fetchPage(buildPageUrl(page, selectedPageLimit));
        return;
      }

      await fetchPage(page);
    };

    const handlePageLimitChange = async (value: string) => {
      const nextLimit = Number(value);
      setSelectedPageLimit(nextLimit);
      await fetchPage(buildPageUrl(1, nextLimit));
    };
  
    return (
      <div className="pagination-component flex items-center justify-between gap-4">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
          <Select value={selectedPageLimit.toString()} onValueChange={handlePageLimitChange}>
            <SelectTrigger className="w-20 select-trigger">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                {pageLimitOptions.map((amount) => (
                  <SelectItem key={amount} value={amount.toString()}>{amount}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Pagination className="mx-0 w-auto pagination">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={previousPage ? () => handlePageChange(previousPage) : undefined}
                className={!previousPage ? 'pointer-events-none opacity-50' : undefined}
              />
            </PaginationItem>
            {pageRanges.map((item, idx) =>
              item === '...' ? (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <span className="pagination-ellipsis px-2">…</span>
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    isActive={Number(item) === currentPage}
                    onClick={() => handlePageChange(item)}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
  
            <PaginationItem>
              <PaginationNext
                onClick={nextPage ? () => handlePageChange(nextPage) : undefined}
                className={!nextPage ? 'pointer-events-none opacity-50' : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )
  }