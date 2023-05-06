import "./Logo.scss"
import logo from "../../resources/img/logo.png"

const Logo = () => {
  
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
      <p>Jobored</p>
    </div>
  )
}

export default Logo