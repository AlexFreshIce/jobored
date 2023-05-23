import { useNavigate, useParams } from "react-router-dom";
import { VacancyPageComponent } from "./VacancyPage";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  getVacancyByID,
  selectCurrentVacancy,
  selectVacancyError,
  selectVacancyIsLoading,
} from "../../store/slice/vacancySlice";
import { useEffect } from "react";

export const VacancyPage = () => {
  const { vacancyID } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const vacancy = useSelector(selectCurrentVacancy);
  const isLoading = useSelector(selectVacancyIsLoading);
  const error = useSelector(selectVacancyError);

  useEffect(() => {
    if (!error && (!vacancy || vacancy?.id !== Number(vacancyID))) {
      dispatch(getVacancyByID(Number(vacancyID)));
    } else {
      navigate("/404");
    }
  }, [error]);

  return VacancyPageComponent({
    isLoading,
    vacancy,
  });
};
