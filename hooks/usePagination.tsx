import { Himno } from '@/components/types';
import { useEffect, useState } from 'react';

const usePagination = (
  filteredHimnos: Himno[],
  flatListRef: React.RefObject<any>,
) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const hymnPerPage = 20;
  const lastPostIndex = currentPage * hymnPerPage;
  const firstPostIndex = lastPostIndex - hymnPerPage;
  const currentHymns = filteredHimnos.slice(firstPostIndex, lastPostIndex);

  const [pages, setPages] = useState<(number | '...')[]>([]);
  const totalPost = filteredHimnos.length;

  useEffect(() => {
    const totalPages = Math.ceil(totalPost / hymnPerPage);
    let pageArray: (number | '...')[] = [];
    if (totalPages <= 6) {
      pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 4) {
        pageArray = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage >= totalPages - 3) {
        pageArray = [
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pageArray = [
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        ];
      }
    }

    setPages(pageArray);
  }, [totalPost, hymnPerPage, currentPage]);

  const scrollToTop = () => {
    if (currentHymns.length < 0) {
      flatListRef.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
    }
  };

  const handlePageChange = (page: number | '...') => {
    if (typeof page === 'number') {
      setCurrentPage(page);

      scrollToTop();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      scrollToTop();
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(totalPost / hymnPerPage)) {
      scrollToTop();
      setCurrentPage(currentPage + 1);
    }
  };

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
