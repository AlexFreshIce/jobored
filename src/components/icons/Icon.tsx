import './Icon.scss' 
import sprite from '../../resources/icon/sprite.svg'

function Icon({ svgID,...props }:{ svgID: string}) {
  return (
    <svg className={`icon-${svgID}`}{...props}>
      <use href={sprite+`#${svgID}`} />
    </svg>
  );
}

export default Icon