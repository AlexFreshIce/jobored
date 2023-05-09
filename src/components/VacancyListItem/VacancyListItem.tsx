import "./VacancyListItem.scss";
import locationImg from "../../resources/img/location.png";
import Icon from "../icons/Icon";

const VacancyListItem = () => {
  return (
    <li className="vacancy__item">
      <h3 className="vacancy__title">Менеджер-дизайнер</h3>
      <p className="vacancy__text-salary">з/п от 70000 rub</p>
      <p className="vacancy__text-dot">•</p>
      <p className="vacancy__text-employment">Полный рабочий день</p>
      <p className="vacancy__text-location">
        <Icon svgID="location" />
        Новый Уренгой
      </p>
    </li>
  );
};

export default VacancyListItem;
