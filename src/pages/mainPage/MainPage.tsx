import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectIsAuth } from "../../store/slice/authSlice";
import { getAllVacancies, selectVacancies} from "../../store/slice/vacancySlice";
import Filter from "../../components/filter/Filter";
import Search from "../../components/search/Search";
import VacancyList from "../../components/vacancyList/VacancyList";
import "./MainPage.scss";
import { AppDispatch, RootState,  } from "../../store";

const PageMain = () => {

  const isAuth = useSelector(selectIsAuth);
  const isFilterChange = useSelector((state:RootState) => state.filterSlice.filter);
  const vacancies = useSelector(selectVacancies);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isAuth) {
      dispatch(loginUser());
    } else {
      dispatch(getAllVacancies());
    }
  }, [isAuth, isFilterChange]);

  return (
    <div className="page">
      <div className="page__container page__container--gap">
        <div className="page__filter">
          <Filter />
        </div>
        <div className="page__content">
          <Search />
          <VacancyList vacancies={vacancies} isLocalPagination={false}/>
        </div>
      </div>
    </div>
  );
};

export default PageMain;
