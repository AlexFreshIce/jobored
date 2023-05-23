import { Link } from "react-router-dom"

import decoration from '../../resources/img/404.svg';

import './Error404Page.scss';

const Page404 = () => {
  return (
    <div className="page404">
     <img src={decoration} alt="decoration"/>
      <p>Упс, здесь еще ничего нет!</p>
      <Link to="/">Поиск Вакансий</Link>
    </div>
  )
}

export default Page404;