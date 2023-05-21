import "./ButtonFavorite.scss";
import { ActionIcon } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  deleteFromFavorites,
  selectFavoriteVacancies,
} from "../../store/slice/vacancySlice";
import { useState, useEffect } from "react";
import { changeFavoritesInLocalStorage } from "../../utils";

const ButtonFavorite = (props: { id: string }) => {
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch<any>();

  // const selectGetFavotiteByID = (id: string) =>
  //   createSelector([selectFavoriteVacancies], (vacancies) => {
  //     return vacancies.filter((item: { id: string }) => {
  //       return item.id === id;
  //     });
  //   });

  // if(isActive){}
  // const favoriteVacancy = useSelector(selectGetFavotiteByID(props.id))
  // const isCurrentVacancy = Boolean(favoriteVacancy?.lenght)
  const findCurrentVacancy = useSelector((state: any) =>
    // state.vacancySlice.favoriteVacancies.find(
    //   (item: { id: string }) => item.id === props.id
    // )
    state.vacancySlice.favoriteVacancies.findIndex(
      (item: { id: string }) => item.id === props.id
    )
  );
  // console.log(findCurrentVacancy);
  const isVacancyInStore = findCurrentVacancy === Number(-1) ? false : true;
  // const favoriteVacancy = useSelector(selectFavoriteVacancies)
  // console.log(favoriteVacancy);

  useEffect(() => {
    setIsActive(isVacancyInStore);
  }, [isVacancyInStore]);

  const addToFavoritesHandler = () => {
    setIsActive(!isActive);
    if (isActive) {
      dispatch(deleteFromFavorites(props.id));
      changeFavoritesInLocalStorage("remove", null, props.id)
    } else {
      // const vacancyObj = { [props.id]: props };
      dispatch(addToFavorites(props));
      changeFavoritesInLocalStorage("add", props, null)
    }
  };



  return (
    <ActionIcon
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
