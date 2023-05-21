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

const VacancyList = ({selector}:any) => {
 
  const vacancies:[] = useSelector(selector);


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
