import Display from '../../components/display.js';
import { useParams } from 'react-router-dom';
function Club() {
  const {club} = useParams();
  return  <>
    <Display type='posts' parent='public' club={club}/>
  </>;
  };

  export default Club;