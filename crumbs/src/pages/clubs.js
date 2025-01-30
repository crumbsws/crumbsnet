import ClubMenu from '../components/clubs/clubMenu.js';
import ExploreClubs from '../components/clubs/exploreClubs.js';
import { useParams } from 'react-router-dom';
import PageWrapper from '../components/pageWrapper.js';


function Clubs() {
  const {club} = useParams();

    return  (
    <PageWrapper>
    {club ? (
    <ClubMenu club={club} />
    ) : (
    <ExploreClubs />
    )}
  </PageWrapper>
    );
  };

  export default Clubs;