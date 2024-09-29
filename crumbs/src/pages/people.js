import { useParams } from 'react-router-dom';
import PeopleMenu from '../components/people/peoplemenu.js';
import Profilecard from '../components/people/profilecard.js';

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