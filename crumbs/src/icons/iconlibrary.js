

function Icons(props) {

    const icon = props.icon;
    if(icon === 'point')
    return (
              <img src={process.env.REACT_APP_API_URL + '/site-images/point.png'} className="font"/>
            )
        
    };

export default Icons;
