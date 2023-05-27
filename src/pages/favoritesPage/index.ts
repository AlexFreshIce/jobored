import { FC } from "react";
import { useSelector } from "react-redux";
import { selectFavoriteVacancies } from "../../store/slice/vacancySlice";
import { FavoritesPageComponent } from "./FavoritesPage";

export const FavoritesPage: FC = () => {
  const vacancies = useSelector(selectFavoriteVacancies);

  return FavoritesPageComponent({
    vacancies,
  });
};
