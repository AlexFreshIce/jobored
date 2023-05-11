import "./PageMain.scss";
import Search from "../../search/Search";
import VacancyList from "../../vacancyList/VacancyList";
import Filter from "../../filter/Filter";

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
