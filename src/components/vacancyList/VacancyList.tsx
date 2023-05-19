import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  selectIsAuth,
  selectAuthIsLoading,
} from "../../store/slice/authSlice";
import {
  selectVacancy,
  selectVacancyIsLoading,
  getAllVacancies,
} from "../../store/slice/vacancySlice";
import { Loader } from "@mantine/core";

import VacancyListItem from "../vacancyListItem/VacancyListItem";

import "./VacancyList.scss";

const VacancyList = () => {
  const isAuth = useSelector(selectIsAuth);
  const isFilterChange = useSelector((state:any) => state.filterSlice.filter);
  const vacancy = useSelector(selectVacancy);
  const authIsLoading = useSelector(selectAuthIsLoading);
  const vacancyIsLoading = useSelector(selectVacancyIsLoading);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    console.log(isAuth);
    if (!isAuth) {
      dispatch(loginUser());
    } else {
      dispatch(getAllVacancies());
    }
  }, [isAuth, isFilterChange]);

  const renderVacancy = (vacancyArr: []) => {
    if (!vacancyArr || vacancyArr.length === 0) {
      return <h4 className="vacancy__text-empty">Вакансий нет!</h4>;
    }
    return vacancyArr.map(({ id, ...props }: { id: string }) => {
      return <VacancyListItem key={id} {...props} />;
    });
  };

  const displayContent =
    authIsLoading || vacancyIsLoading ? (
      <Loader className="vacancy__loader" />
    ) : (
      renderVacancy(vacancy)
    );

  return <ul>{displayContent}</ul>;
};

export default VacancyList;
