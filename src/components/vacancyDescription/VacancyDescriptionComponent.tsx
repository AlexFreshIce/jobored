import { FC } from "react";
import "./styles.scss";
import { VacancyDescriptionType } from "./types";

export const VacancyDescriptionComponent: FC<VacancyDescriptionType> = (
  props
) => {
  const vacancyRichText = props.vacancy.vacancyRichText;
  const theObj = { __html: vacancyRichText };

  return (
    <div className="vacancy__description" dangerouslySetInnerHTML={theObj} />
  );
};
