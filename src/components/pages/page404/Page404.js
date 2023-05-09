// import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"
import './Page404.scss';
import decoration from '../../../resources/img/404.svg';
const Page404 = () => {
  return (
    <div className="page404">
      {/* <ErrorMessage /> */}
     <img src={decoration} alt="decoration"/>
      <p>Упс, здесь еще ничего нет!</p>
      <Link to="/">Поиск Вакансий</Link>
    </div>
  )
}

export default Page404;