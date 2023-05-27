import logo from "../../resources/img/logo.svg";
import "./styles.scss";

export const LogoComponent = () => {
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
      <p>Jobored</p>
    </div>
  );
};
