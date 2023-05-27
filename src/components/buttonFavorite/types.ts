import { VacancyType } from "../../types";

export type ButtonFavoriteType = {
  vacancy: VacancyType;
};

export type ButtonFavoriteComponentType = {
  isActive: boolean;
  vacancyId: VacancyType["id"];

  addToFavoritesHandler(): void;
};
