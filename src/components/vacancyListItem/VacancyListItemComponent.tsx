import "./VacancyListItem.scss";
import { Link } from "react-router-dom";
import { VacancyHeader } from "../vacancyHeader";
import { ButtonFavorite } from "../buttonFavorite";
import { FC } from "react";
import { VacancyListItemType } from "./types";

export const VacancyListItemComponent: FC<VacancyListItemType> = (
  props
) => {
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
