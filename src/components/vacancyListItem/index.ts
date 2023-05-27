import { FC } from "react";
import { VacancyListItemComponent } from "./VacancyListItemComponent";
import { VacancyListItemType } from "./types";

export const VacancyListItem: FC<VacancyListItemType> = (props) => {
  return VacancyListItemComponent(props);
};
