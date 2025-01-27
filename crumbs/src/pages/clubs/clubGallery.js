import Display from "../../components/display";
import { useParams } from "react-router-dom";
function ClubGallery() {
  const {club} = useParams();

  return  <>
        <div className='post container' >  
        <Display type='gallery' club={club}/>
        </div>
  </>;
  };

  export default ClubGallery;