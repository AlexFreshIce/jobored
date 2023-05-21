import "./VacancyPage.scss";
import Spinner from "../../components/spinner/Spinner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getVacancyByID,
  selectCurrentVacancy,
  selectVacancyError,
} from "../../store/slice/vacancySlice";
import { useDispatch } from "react-redux";
import VacancyHeader from "../../components/vacancyHeader/VacancyHeader";
import VacancyDescript from "../../components/vacancyDescription/VacancyDescription";

const VacancyPage = () => {
  const { vacancyID } = useParams();
  const dispatch = useDispatch();
  const vacancyData = useSelector(selectCurrentVacancy);
  const vacancyFetchError = useSelector(selectVacancyError);

  console.log(vacancyData);

  useEffect(() => {
    if (!vacancyData) {
      dispatch(getVacancyByID(vacancyID));
    }
  }, [vacancyData]);

  const displayContent = vacancyData ? View(vacancyData) : <Spinner />;

  return (
    <div className="page">
      <div className="page__container">
        <div className="page__content">{displayContent}</div>;
      </div>
    </div>
  );
};

const View = (data) => {
  return (
    <>
      <VacancyHeader {...data} />
      <VacancyDescript {...data} />
    </>
  );
};

export default VacancyPage;
