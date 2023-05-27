import { FC } from "react";
import { VacancyList } from "../../components/vacancyList";
import { FavoritesPageComponentType } from "./types";

export const FavoritesPageComponent: FC<FavoritesPageComponentType> = (
  props
) => {
  const { vacancies } = props;

  return (
    <div className="page">
      <div className="page__container">
        <div className="page__content">
          <VacancyList vacancies={vacancies} isLocalPagination={true} />
        </div>
      </div>
    </div>
  );
};
