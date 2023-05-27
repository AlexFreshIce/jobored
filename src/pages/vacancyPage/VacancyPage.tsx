import { FC } from "react";
import { ButtonFavorite } from "../../components/buttonFavorite";
import { Spinner } from "../../components/spinner";
import { VacancyDescription } from "../../components/vacancyDescription";
import { VacancyHeader } from "../../components/vacancyHeader";
import "./styles.scss";
import { VacancyPageComponentType } from "./types";

export const VacancyPageComponent: FC<VacancyPageComponentType> = (props) => {
  const { isLoading, vacancy } = props;

  if (!vacancy || isLoading) {
    return <Spinner />;
  }

  const dataAttr = `vacancy-${vacancy.id}`;

  return (
    <div className="page">
      <div className="page__container">
        <div className="page__content">
          <div data-elem={dataAttr} className="vacancy__header-container">
            <VacancyHeader vacancy={vacancy} />
            <ButtonFavorite vacancy={vacancy} />
          </div>
          <VacancyDescription vacancy={vacancy} />
        </div>
      </div>
    </div>
  );
};
