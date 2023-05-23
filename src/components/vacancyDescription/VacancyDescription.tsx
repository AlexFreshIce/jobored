import { VacancyType } from "../../types";
import "./VacancyDescription.scss";

const VacancyDescript = ({ vacancyRichText }: VacancyType) => {
  const theObj = { __html: vacancyRichText };
  return (
    <div className="vacancy__description" dangerouslySetInnerHTML={theObj} />
  );
};

export default VacancyDescript;
