import "./FavoritesPage.scss";
import VacancyList from "../../components/vacancyList/VacancyList";
import { selectFavoriteVacancies } from "../../store/slice/vacancySlice";
import { useSelector } from "react-redux";

const PageFavorites = () => {
  const vacancies = useSelector(selectFavoriteVacancies);
  return (
    <div className="page">
      <div className="page__container">
        <div className="page__content">
          <VacancyList vacancies={vacancies} isLocalPagination={true} />
        </div>
      </div>
    </div>
  );
};

export default PageFavorites;
