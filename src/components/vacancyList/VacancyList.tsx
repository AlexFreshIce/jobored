import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  selectIsAuth,
  // selectAuthIsLoading,
} from "../../store/slice/authSlice";
import {
  selectVacancies,
  // selectVacancyIsLoading,
  getAllVacancies,
} from "../../store/slice/vacancySlice";
import Spinner from "../spinner/Spinner";

import VacancyListItem from "../vacancyListItem/VacancyListItem";

import "./VacancyList.scss";

const VacancyList = () => {
  const isAuth = useSelector(selectIsAuth);
  const isFilterChange = useSelector((state: any) => state.filterSlice.filter);
  const vacancies = useSelector(selectVacancies);
  // const authIsLoading = useSelector(selectAuthIsLoading);
  // const vacancyIsLoading = useSelector(selectVacancyIsLoading);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    console.log(isAuth);
    if (!isAuth) {
      dispatch(loginUser());
    } else {
      dispatch(getAllVacancies());
    }
  }, [isAuth, isFilterChange]);

  const renderVacancies = (vacanciesArr: []) => {
    if (!vacanciesArr || vacanciesArr.length === 0) {
      return <h4 className="vacancy__text-empty">Вакансий нет!</h4>;
    }
    return vacanciesArr.map((props: { id: string }) => {
      return <VacancyListItem key={props.id} {...props} />;
    });
  };


  const displayContent = vacancies ? renderVacancies(vacancies) : <Spinner />;

  return <ul className="vacancy__list">{displayContent}</ul>;
};

export default VacancyList;
