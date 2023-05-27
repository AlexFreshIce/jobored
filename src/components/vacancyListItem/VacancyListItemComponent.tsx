import { FC } from "react";
import { Link } from "react-router-dom";
import { ButtonFavorite } from "../buttonFavorite";
import { VacancyHeader } from "../vacancyHeader";
import "./styles.scss";
import { VacancyListItemType } from "./types";

export const VacancyListItemComponent: FC<VacancyListItemType> = (props) => {
  const { vacancy } = props;

  return (
    <li data-elem={`vacancy-${vacancy.id}`} className="vacancy__item">
      <Link to={`/${vacancy.id}`}>
        <VacancyHeader vacancy={vacancy} />
      </Link>
      <ButtonFavorite vacancy={vacancy} />
    </li>
  );
};
