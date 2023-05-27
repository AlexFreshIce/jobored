import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { changeCurrentPage, selectPage } from "../../store/slice/filterSlice";
import { selectVacancyIsLoading } from "../../store/slice/vacancySlice";
import { VacancyListComponent } from "./VacancyListComponent";
import { VacancyListType } from "./type";

const MAX_ITEMS_ON_THE_PAGE = 4;
const MAX_PAGES = 125;

export const VacancyList: FC<VacancyListType> = (props) => {
  const { vacancies, isLocalPagination } = props;
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectVacancyIsLoading);
  const currentPage = useSelector(selectPage);

  const { objects } = vacancies;

  const maxPage = vacancies
    ? Math.ceil(vacancies.total / MAX_ITEMS_ON_THE_PAGE)
    : 0;
  const lastPage = maxPage > MAX_PAGES ? MAX_PAGES : maxPage;

  const vacanciesForLocalPagination = () => {
    const firstElem = (currentPage - 1) * MAX_ITEMS_ON_THE_PAGE;
    const lastElem =
      firstElem + MAX_ITEMS_ON_THE_PAGE <= objects.length
        ? firstElem + MAX_ITEMS_ON_THE_PAGE
        : objects.length;

    return objects.slice(firstElem, lastElem);
  };

  const vacanciesForRender = isLocalPagination
    ? vacanciesForLocalPagination()
    : objects;

  const vacanciesCount = vacanciesForRender.length;

  const onChangeCurrentPage = (page: number) => {
    dispatch(changeCurrentPage(page));
  };

  useEffect(() => {
    if (vacanciesCount === 0) {
      const page = currentPage > 2 ? currentPage - 1 : 1;
      onChangeCurrentPage(page);
    }
  }, [vacanciesCount]);

  return VacancyListComponent({
    vacanciesForRender,
    vacanciesCount,
    isLoading,
    currentPage,
    lastPage,
    onChangeCurrentPage,
  });
};
