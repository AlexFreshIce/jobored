import "./FavoritesPage.scss";
import VacancyList from "../../components/vacancyList/VacancyList";
import { selectFavoriteVacancies } from "../../store/slice/vacancySlice";

const PageFavorites = () => {
  return (
    <div className="page">
    <div className="page__container">
      <div className="page__content">
      <VacancyList selector={selectFavoriteVacancies}/>
      </div>
    </div>
  </div>
  );
};

export default PageFavorites;
