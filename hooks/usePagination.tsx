import { Himno } from '@/components/types';
import { useEffect, useState, useMemo, useCallback } from 'react';

const usePagination = (
  filteredHimnos: Himno[],
  flatListRef: React.RefObject<any>,
) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const hymnPerPage = 20;

  const totalPost = filteredHimnos.length;
  const lastPostIndex = currentPage * hymnPerPage;
  const firstPostIndex = lastPostIndex - hymnPerPage;

  const currentHymns = useMemo(
    () => filteredHimnos.slice(firstPostIndex, lastPostIndex),
    [filteredHimnos, firstPostIndex, lastPostIndex],
  );

  const [pages, setPages] = useState<(number | '...')[]>([]);

  useEffect(() => {
    const totalPages = Math.ceil(totalPost / hymnPerPage);
    let pageArray: (number | '...')[] = [];
    if (totalPages <= 5) {
      pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      switch (true) {
        case currentPage >= 1 && currentPage <= 3:
          pageArray = [1, 2, 3, 4, '...', totalPages];
          break;
        case currentPage == totalPages - 2:
          pageArray = [
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            totalPages,
          ];
          break;
        case currentPage == totalPages - 1:
          pageArray = [
            1,
            '...',
            currentPage - 2,
            currentPage - 1,
            currentPage,
            totalPages,
          ];
          break;
        case currentPage == totalPages:
          pageArray = [
            1,
            '...',
            currentPage - 3,
            currentPage - 2,
            currentPage - 1,
            currentPage,
          ];
          break;
        default:
          pageArray = [
            1,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages,
          ];
      }
    }
    setPages(pageArray);
  }, [totalPost, currentPage]);

  const scrollToTop = useCallback(() => {
    if (currentHymns.length > 0) {
      flatListRef.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
    }
  }, [currentHymns.length, flatListRef]);

  const handlePageChange = useCallback(
    (page: number | '...') => {
      if (typeof page === 'number') {
        setCurrentPage(page);
        scrollToTop();
      }
    },
    [scrollToTop],
  );

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      scrollToTop();
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage, scrollToTop]);

  const handleNext = useCallback(() => {
    const totalPages = Math.ceil(totalPost / hymnPerPage);
    if (currentPage < totalPages) {
      scrollToTop();
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPost, hymnPerPage, scrollToTop]);

  return {
    currentHymns,
    hymnPerPage,
    handlePageChange,
    currentPage,
    handlePrevious,
    handleNext,
    pages,
  };
};

export default usePagination;
