import "./VacancyListItem.scss";
import { ActionIcon } from "@mantine/core";
import { IconMapPin, IconStar } from "@tabler/icons-react";
import { salary } from "../../utils";

// export interface IVacancyListItem {
//   profession: string;
//   firm_name: string;
//   town: {};
//   type_of_work: {};
//   currency: string;
// }

const VacancyListItem = ({
  profession,
  firm_name,
  town,
  type_of_work,
  payment_from,
  payment_to,
  currency,
}: any) => {


  const resoultSalary = salary(payment_from, payment_to, currency);

  return (
    <li className="vacancy__item">
      <h3 className="vacancy__title">{profession}</h3>
      {/* <p className="vacancy__text-firm">{firm_name} </p> */}
      <p className="vacancy__text-salary">{resoultSalary}</p>
      <p className="vacancy__text-dot">•</p>
      <p className="vacancy__text-employment">{type_of_work.title}</p>
      <p className="vacancy__text-location">
        <IconMapPin size={20} />
        {town.title}
      </p>
      <ActionIcon size={22} className="vacancy__btn-favorite">
        <IconStar />
      </ActionIcon>
    </li>
  );
};

export default VacancyListItem;
