import "./VacancyHeader.scss";
import { IconMapPin } from "@tabler/icons-react";
import { FC } from "react";
import { VacancyHeaderComponentType } from "./types";

export const VacancyHeaderComponent: FC<VacancyHeaderComponentType> = (
  props
) => {
  const {
    profession,
    firm_name,
    town,
    type_of_work,
    resoultSalary,
  } = props;

  return (
    <div className="vacancy__header">
      <h3 className="vacancy__title">{profession}</h3>
      {/* <p className="vacancy__text-firm">{firm_name} </p> */}
      <p className="vacancy__text-salary">{resoultSalary}</p>
      <p className="vacancy__text-dot">•</p>
      <p className="vacancy__text-employment">{type_of_work.title}</p>
      <p className="vacancy__text-location">
        <IconMapPin size={20} /> {town.title}
      </p>
    </div>
  );
};
