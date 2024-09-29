
import { useParams } from 'react-router-dom';
import Clubcard from '../../components/people/card.js';
function Cards() {
  const {people} = useParams();
  return  <>
    <Clubcard user={people} />
    
  </>;
  };

  export default Cards;