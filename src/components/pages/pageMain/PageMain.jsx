
import "./PageMain.scss";
import Search  from "../../search/Search";
import VacancyList from "../../vacancyList/VacancyList";
const PageMain = () => {
  return (
    <div className="page-main">
      <div className="page-main__container">
        <div className="page-main__filter-form">search</div>
        <div className="page-main__content">
         <Search/>
         <VacancyList/>
          </div>
      </div>
    </div>
  );
};

export default PageMain;
