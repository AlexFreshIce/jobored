import "./VacancyList.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "@mantine/core";
import { selectVacancyIsLoading } from "../../store/slice/vacancySlice";
import { changeCurrentPage, selectPage } from "../../store/slice/filterSlice";
import VacancyListItem from "../vacancyListItem/VacancyListItem";
import Spinner from "../spinner/Spinner";
import { AppDispatch } from "../../store";
import { VacanciesType, VacancyType } from "../../types";

const VacancyList = ({
  vacancies,
  isLocalPagination,
}: {
  vacancies: VacanciesType;
  isLocalPagination: boolean;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectVacancyIsLoading);
  const currentPage = useSelector(selectPage);
  const renderVacancies = (
    { objects }: VacanciesType,
    isLocalPagination: boolean,
    currentPage: number,
    maxOnPage: number
  ) => {
    if (isLocalPagination) {
      const firstElem = (currentPage - 1) * maxOnPage;
      const lastElem =
        firstElem + maxOnPage <= objects.length
          ? firstElem + maxOnPage
          : objects.length;

      const renderVacancies = [];
      for (let i = firstElem; i < lastElem; i++) {
        const vacancy: VacancyType = objects[i];
        renderVacancies.push(<VacancyListItem key={vacancy.id} {...vacancy} />);
      }
      return renderVacancies;
    } else {
      return objects.map((vacancy: VacancyType) => {
        return <VacancyListItem key={vacancy.id} {...vacancy} />;
      });
    }
  };
  const maxOnPage = 4;
  const maxPage = vacancies ? Math.ceil(vacancies.total / maxOnPage) : 0;
  const lastPage = maxPage > 125 ? 125 : maxPage;

  const renderedVacanciesArr = renderVacancies(
    vacancies,
    isLocalPagination,
    currentPage,
    maxOnPage
  );

  useEffect(() => {
    dispatch(changeCurrentPage(1));
  }, [isLocalPagination]);

  useEffect(() => {
    if (renderedVacanciesArr.length === 0) {
      dispatch(changeCurrentPage(1));
    }
  }, [renderedVacanciesArr]);

  const onChangeCurrentPage = (page: number) => {
    dispatch(changeCurrentPage(page));
  };

  const renderedContent = renderedVacanciesArr.length ? (
    renderedVacanciesArr
  ) : (
    <h4 className="vacancy__text-empty">Вакансий нет!</h4>
  );
  const displayContent =
    vacancies && !isLoading ? renderedContent : <Spinner />;

  return (
    <>
      <ul className="vacancy__list">{displayContent}</ul>
      <Pagination
        position="center"
        total={lastPage}
        siblings={1}
        className="vacancy__pagination"
        onChange={onChangeCurrentPage}
        value={currentPage}
      />
    </>
  );
};

export default VacancyList;
