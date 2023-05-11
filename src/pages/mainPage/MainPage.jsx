import Filter from "../../components/filter/Filter";
import Search from "../../components/search/Search";
import VacancyList from "../../components/vacancyList/VacancyList";

import "./MainPage.scss";

const PageMain = () => {
  return (
    <div className="page-main">
      <div className="page-main__container">
        <Filter />
        <div className="page-main__content">
          <Search />
          <VacancyList />
        </div>
      </div>
    </div>
  );
};

export default PageMain;
