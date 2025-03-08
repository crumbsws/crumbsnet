import { Link } from "react-router-dom";
function Pin(props) {
  const url = props.url;
    return ( 
      <Link to={`/publish/pin/post/${url}`}>
      <button className='interaction'><i class="fa-regular fa-bookmark"></i> Pin</button>
      </Link>
    )
    
  }
  export default Pin;