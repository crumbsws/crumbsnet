import ClubMenu from '../components/clubs/clubmenu.js';
import ExploreClubs from '../components/clubs/exploreclubs.js';
import { useParams } from 'react-router-dom';

function Clubs() {
  const {club} = useParams();

    return  <>
    {club ? (
    <ClubMenu club={club} />
    ) : (
    <ExploreClubs />
    )}
  </>;
  };

  export default Clubs;