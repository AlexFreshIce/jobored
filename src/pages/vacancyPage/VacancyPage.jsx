import "./VacancyPage.scss";
import Spinner from "../../components/spinner/Spinner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getVacancyByID,
  selectCurrentVacancy,
  selectVacancyIsLoading,
  selectVacancyError,
} from "../../store/slice/vacancySlice";
import { useDispatch } from "react-redux";
import VacancyHeader from "../../components/vacancyHeader/VacancyHeader";
import VacancyDescript from "../../components/vacancyDescription/VacancyDescription";
import { useNavigate } from "react-router-dom";
import ButtonFavorite from "../../components/buttonFavorite/ButtonFavorite";

const VacancyPage = () => {
  const { vacancyID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vacancyData = useSelector(selectCurrentVacancy);
  const isLoading = useSelector(selectVacancyIsLoading);
  const error = useSelector(selectVacancyError);

  useEffect(() => {
    if (!error && (!vacancyData || vacancyData?.id !== vacancyID)) {
      dispatch(getVacancyByID(vacancyID));
    } else {
      navigate("/404");
    }
  }, [error]);

  const displayContent =
    vacancyData && !isLoading ? View(vacancyData) : <Spinner />;
  // const displayContent = <Spinner />;

  return (
    <>
      <div className="page">
        <div className="page__container">
          <div className="page__content">{displayContent}</div>
        </div>
      </div>
    </>
  );
};

const View = (data) => {
  return (
    <>
      <div className="vacancy__header-container">
        <VacancyHeader {...data} />
        <ButtonFavorite {...data} />
      </div>

      <VacancyDescript {...data} />
    </>
  );
};

export default VacancyPage;
