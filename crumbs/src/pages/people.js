import { useParams } from 'react-router-dom';
import PeopleMenu from '../components/people/peopleMenu.js';
import Profilecard from '../components/people/profileCard.js';

function People() {
    const {people} = useParams();



    return  (
        <>
        <Profilecard user={people}/>
        <PeopleMenu user={people} />
            </>
          )
}


export default People;