import "./VacancyHeader.scss";
import { IconMapPin } from "@tabler/icons-react";
import { salary } from "../../utils";
// import ButtonFavorite from "../buttonFavorite/ButtonFavorite";

const VacancyHeader = ({
  id,
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

export default VacancyHeader;
