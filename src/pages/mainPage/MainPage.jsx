import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectIsAuth } from "../../store/slice/authSlice";
import { getAllVacancies, selectVacancies} from "../../store/slice/vacancySlice";
import Filter from "../../components/filter/Filter";
import Search from "../../components/search/Search";
import VacancyList from "../../components/vacancyList/VacancyList";
import "./MainPage.scss";

const PageMain = () => {

  const isAuth = useSelector(selectIsAuth);
  const isFilterChange = useSelector((state) => state.filterSlice.filter);
  const dispatch = useDispatch();

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
          <VacancyList selector={selectVacancies}/>
        </div>
      </div>
    </div>
  );
};

export default PageMain;
