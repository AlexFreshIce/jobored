import "./VacancyListItem.scss";
import { ActionIcon } from "@mantine/core";
import { IconMapPin, IconStar } from "@tabler/icons-react";

const VacancyListItem = () => {
  return (
    <li className="vacancy__item">
      <h3 className="vacancy__title">Ведущий графический дизайнер НЕ УДАЛЕННО</h3>
      <p className="vacancy__text-salary">з/п от 70000 rub</p>
      <p className="vacancy__text-dot">•</p>
      <p className="vacancy__text-employment">Сменный график работы</p>
      <p className="vacancy__text-location">
        <IconMapPin size={20} />
        Новый Уренгой
      </p>
        <ActionIcon size={22} className="vacancy__btn-favorite" >
          <IconStar />
        </ActionIcon>
    </li>
  );
};

export default VacancyListItem;
