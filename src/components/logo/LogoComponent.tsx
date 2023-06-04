import logo from "../../resources/img/logo.svg";
import "./styles.scss";

export const LogoComponent = () => {
  return (
    <div className="logo">
      <img className="logo__img" src={logo} alt="logo" />
      <h1 className="logo__title">Jobored</h1>
    </div>
  );
};
