import ClubSetup from '../components/clubs/clubSetup.js';
import { useEffect, useState } from 'react';
import { getOwnedClub } from '../components/utils.js';
import Loading from '../components/loading.js';
import ClubEdit from '../components/clubs/clubEdit.js';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user.data[0].name);
  useEffect(() => {
    getOwnedClub(setData, setLoading);
  }, [])

  const { club } = useParams();

  if (loading) {
    return (
      <Loading />


    );
  }
  else {
    return (
      <>
        {club ? //its null getItem only brings the club name -f
          (
            <>
              <ClubEdit club={club} />
            </>
          ) : (
            <>
              <div className='post container'>
                {data.map(({ name, description, card }) => (
                  <>

                    <div className='contained' id='club-container' key={name}>
                      <Link to={"/dashboard/" + name}>
                        <p>{name}</p>
                        <p className="email">{description}</p>
                      </ Link>
                    </div>
                  </>
                ))}
              </div>
              <ClubSetup />
              {console.log(club)}

            </>
          )
        }
      </>
    )
  }

};

export default Dashboard;