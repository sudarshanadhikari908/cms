import { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { scrollToTop } from '../../utils/scroll';

interface IPaginationProps {
  itemsCount: number;
  itemsPerPage: number;
  currentPage: number;
  alwaysShown: boolean;
  setCurrentPage: (number: number) => void;
}

const PaginationComponent = ({
  itemsCount,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  alwaysShown = true,
}: IPaginationProps) => {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  const isPaginationShown = alwaysShown ? true : pagesCount > 1;
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  const changePage = (number: number) => {
    if (currentPage === number) return;
    setCurrentPage(number);
    scrollToTop();
  };

  const onPageNumberClick = (pageNumber: number) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage(currentPage - 1);
  };

  const onNextPageClick = () => {
    changePage(currentPage + 1);
  };

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      setCurrentPage(pagesCount);
    }
  };

  let isPageNumberOutOfRange: boolean;

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers = Math.abs(pageNumber - currentPage) <= 2;

    const handleEllipsisClick = () => {
      setCurrentPage(pageNumber);
    };

    if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          key={pageNumber}
          activeLabel=""
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis className="pg-ellipsis" key={pageNumber} onClick={handleEllipsisClick} />;
    }

    return null;
  });

  useEffect(setLastPageAsCurrent, [pagesCount]);

  return (
    <>
      {isPaginationShown && (
        <Pagination size="sm">
          <Pagination.Prev onClick={onPreviousPageClick} disabled={isCurrentPageFirst || itemsCount == 0}>
            <i className="mr-1 fas fa-angle-left"></i> Previous
          </Pagination.Prev>
          {pageNumbers}
          <Pagination.Next onClick={onNextPageClick} disabled={isCurrentPageLast || itemsCount == 0}>
            Next <i className="ml-1 fas fa-angle-right"></i>
          </Pagination.Next>
        </Pagination>
      )}
    </>
  );
};

export default PaginationComponent;
