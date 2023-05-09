import "./Logo.scss"
import logo from "../../resources/img/logo.svg"

const Logo = () => {
  
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
      <p>Jobored</p>
    </div>
  )
}

export default Logo