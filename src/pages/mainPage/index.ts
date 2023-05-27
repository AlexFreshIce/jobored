import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import {
  loginUser,
  selectAuthError,
  selectIsAuth,
} from "../../store/slice/authSlice";
import { selectFilter } from "../../store/slice/filterSlice";
import {
  getAllVacancies,
  selectVacancies,
} from "../../store/slice/vacancySlice";
import { MainPageComponent } from "./MainPage";

export const MainPage: FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const isFilterChange = useSelector(selectFilter);
  const vacancies = useSelector(selectVacancies);
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      dispatch(loginUser());
    } else {
      dispatch(getAllVacancies());
    }
    if (error) {
      navigate("/404");
    }
  }, [isAuth, isFilterChange, error]);

  return MainPageComponent({
    vacancies,
  });
};
