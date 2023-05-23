import "./VacancyListItem.scss";
import { Link } from "react-router-dom";
import VacancyHeader from "../vacancyHeader/VacancyHeader";
import ButtonFavorite from "../buttonFavorite/ButtonFavorite";
import { VacancyType } from "../../types";

const VacancyListItem = (props: VacancyType) => {
  const dataAttr = `vacancy-${props.id}`;
  return (
    <li data-elem={dataAttr} className="vacancy__item">
      <Link to={`/${props.id}`}>
        <VacancyHeader {...props} />
      </Link>
      <ButtonFavorite {...props}  />
    </li>
  );
};

export default VacancyListItem;
