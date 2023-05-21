import Filter from "../../components/filter/Filter";
import Search from "../../components/search/Search";
import VacancyList from "../../components/vacancyList/VacancyList";

import "./MainPage.scss";

const PageMain = () => {
  return (
    <div className="page">
      <div className="page__container page__container--gap">
        <div className="page__filter">
          <Filter />
        </div>
        <div className="page__content">
          <Search />
          <VacancyList />
        </div>
      </div>
    </div>
  );
};

export default PageMain;
