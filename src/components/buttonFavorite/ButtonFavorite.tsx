import "./ButtonFavorite.scss";
import { ActionIcon } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  deleteFromFavorites,
} from "../../store/slice/vacancySlice";
import { useState, useEffect } from "react";
import { changeFavoritesInLocalStorage } from "../../utils";

const ButtonFavorite = (props: { id: string }) => {
  
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch<any>();
  const findCurrentVacancy = useSelector((state: any) =>
    state.vacancySlice.favoriteVacancies.objects?.findIndex(
      (item: { id: string }) => item.id === props.id
    )
  );
  const isVacancyInStore = findCurrentVacancy === Number(-1) ? false : true;

  useEffect(() => {
    setIsActive(isVacancyInStore);
  }, [isVacancyInStore]);

  const addToFavoritesHandler = () => {
    setIsActive(!isActive);
    if (isActive) {
      dispatch(deleteFromFavorites(props.id));
      changeFavoritesInLocalStorage("remove", null, props.id);
    } else {
      dispatch(addToFavorites(props));
      changeFavoritesInLocalStorage("add", props, null);
    }
  };

  const dataAttr = `vacancy-${props.id}-shortlist-button`;

  return (
    <ActionIcon
      data-elem={dataAttr}
      key={props.id}
      size={22}
      className="vacancy__btn-favorite"
      onClick={addToFavoritesHandler}
    >
      <IconStar
        className={
          isActive ? "btn-favorite btn-favorite--active" : "btn-favorite"
        }
      />
    </ActionIcon>
  );
};

export default ButtonFavorite;
