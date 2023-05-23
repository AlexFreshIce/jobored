import { FC } from "react";
import { FavoritesPageComponent } from "./FavoritesPage";
import { useSelector } from "react-redux";
import { selectFavoriteVacancies } from "../../store/slice/vacancySlice";

export const FavoritesPage: FC = () => {
  const vacancies = useSelector(selectFavoriteVacancies);

  return FavoritesPageComponent({
    vacancies,
  });
};
