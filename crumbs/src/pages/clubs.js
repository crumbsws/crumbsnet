import ClubMenu from '../components/clubs/clubMenu.js';
import ExploreClubs from '../components/clubs/exploreClubs.js';
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