import { FC } from "react";
import { Filter } from "../../components/filter";
import { Search } from "../../components/search";
import { VacancyList } from "../../components/vacancyList";
import "./styles.scss";
import { MainPageComponentType } from "./types";

export const MainPageComponent: FC<MainPageComponentType> = (props) => {
  const { vacancies } = props;

  return (
    <div className="page">
      <div className="page__container page__container--gap">
        <div className="page__filter">
          <Filter />
        </div>
        <div className="page__content">
          <Search />
          <VacancyList vacancies={vacancies} isLocalPagination={false} />
        </div>
      </div>
    </div>
  );
};
