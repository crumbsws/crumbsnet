import { useParams } from 'react-router-dom';
import PeopleMenu from '../components/people/peopleMenu.js';
import Profilecard from '../components/people/profileCard.js';
import PageWrapper from '../components/pageWrapper.js';

function People() {
    const {people} = useParams();



    return  (
        <PageWrapper>
        <Profilecard user={people}/>
        <PeopleMenu user={people} />
        </PageWrapper>
          )
}


export default People;