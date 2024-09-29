import Display from '../../components/display.js';
import { useParams } from 'react-router-dom';
function Main() {
  const {people} = useParams();
  return  <>
    <Display type='posts' parent="public" user={people}/>
  </>;
  };

  export default Main;