import "./Logo.scss"
import logo from "../../resources/img/logo.svg"

export const LogoComponent = () => {
  
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
      <p>Jobored</p>
    </div>
  )
}