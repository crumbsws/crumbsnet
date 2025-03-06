

import point from './images/point.png';
function Icons(props) {

  const icon = props.icon;
  if (icon === 'pointSmall')
    return (
      <img src={point} className="fontSmall" />
    )
  if (icon === 'pointBig')
    return (
      <img src={point} className="fontBig" />
    )


};

export default Icons;
