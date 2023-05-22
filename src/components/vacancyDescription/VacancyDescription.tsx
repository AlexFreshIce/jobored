import "./VacancyDescription.scss";

const VacancyDescript = (props: { vacancyRichText: string }) => {
  const theObj = { __html: props.vacancyRichText };
  return (
    <div className="vacancy__description" dangerouslySetInnerHTML={theObj} />
  );
};

export default VacancyDescript;
