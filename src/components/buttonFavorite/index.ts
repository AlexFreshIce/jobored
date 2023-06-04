import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  addToFavorites,
  deleteFromFavorites,
  selectFavoriteVacancies,
} from "../../store/slice/vacancySlice";
import { changeFavoritesInLocalStorage } from "../../utils";
import { ButtonFavoriteComponent } from "./ButtonFavoriteComponent";
import { ButtonFavoriteType } from "./types";

export const ButtonFavorite: FC<ButtonFavoriteType> = (props) => {
  const { vacancy } = props;
  const [isActive, setIsActive] = useState(false);
  const favoriteVacancies = useSelector(selectFavoriteVacancies);

  const dispatch = useDispatch<AppDispatch>();

  const vacancyId = vacancy.id;

  const findCurrentVacancy = favoriteVacancies.objects.findIndex(
    (item) => item.id === vacancyId
  );

  const isVacancyInStore = findCurrentVacancy === Number(-1) ? false : true;

  const addToFavoritesHandler = () => {
    setIsActive(!isActive);
    if (isActive) {
      dispatch(deleteFromFavorites(vacancyId));
      changeFavoritesInLocalStorage("remove", null, vacancyId);
    } else {
      dispatch(addToFavorites(vacancy));
      changeFavoritesInLocalStorage("add", vacancy, null);
    }
  };

  useEffect(() => {
    setIsActive(isVacancyInStore);
  }, [isVacancyInStore]);

  return ButtonFavoriteComponent({
    addToFavoritesHandler,
    isActive,
    vacancyId,
  });
};
