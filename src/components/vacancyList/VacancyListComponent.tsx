import { Pagination } from "@mantine/core";
import { FC } from "react";
import { VacancyType } from "../../types";
import { Spinner } from "../spinner";
import { VacancyListItem } from "../vacancyListItem";
import "./styles.scss";
import { VacancyListComponentType } from "./type";

export const VacancyListComponent: FC<VacancyListComponentType> = (props) => {
  const {
    vacanciesForRender,
    vacanciesCount,
    isLoading,
    currentPage,
    lastPage,
    onChangeCurrentPage,
  } = props;

  return isLoading ? (
    <Spinner />
  ) : vacanciesCount ? (
    <>
      <ul className="vacancy__list">
        {vacanciesForRender.map((vacancy: VacancyType) => {
          return <VacancyListItem key={vacancy.id} vacancy={vacancy} />;
        })}
      </ul>
      <Pagination
        position="center"
        total={lastPage}
        siblings={1}
        className="vacancy__pagination"
        onChange={onChangeCurrentPage}
        value={currentPage}
      />
    </>
  ) : (
    <h4 className="vacancy__text-empty">Вакансии не найдены.</h4>
  );
};
