import "./VacancyListItem.scss";
import { Link } from "react-router-dom";
import VacancyHeader from "../vacancyHeader/VacancyHeader";
import ButtonFavorite from "../buttonFavorite/ButtonFavorite";

// export interface IVacancyListItem {
//   profession: string;
//   firm_name: string;
//   town: {};
//   type_of_work: {};
//   currency: string;
// }

const VacancyListItem = (props: any) => {


  // const displayContent = isList ? View() : <Spinner />;

  // const liContainer = () => {
  //   return (
  //     <li className="vacancy__item">
  //       <Link to={`/${id}`}></Link>
  //       <ActionIcon size={22} className="vacancy__btn-favorite">
  //         <IconStar />
  //       </ActionIcon>
  //     </li>
  //   );
  // };

  return (
    <li className="vacancy__item">
      <Link to={`/${props.id}`}>
     < VacancyHeader {...props}/>
      </Link>
    <ButtonFavorite/>
    </li>
  );
};

export default VacancyListItem;
