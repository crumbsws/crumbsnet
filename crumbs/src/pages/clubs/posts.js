import Display from '../../components/display.js';
import { useParams } from 'react-router-dom';
function Posts() {
  const {club} = useParams();
  return  <>
    <Display type='posts' parent='public' club={club}/>
  </>;
  };

  export default Posts;