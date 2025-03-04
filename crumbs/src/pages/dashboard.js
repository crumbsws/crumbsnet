import ClubSetup from '../components/clubs/clubSetup.js';
import { useEffect, useState } from 'react';
import { getOwnedClub } from '../components/utils.js';
import Loading from '../components/loading.js';
import ClubEdit from '../components/clubs/clubEdit.js';
import PageWrapper from '../components/pageWrapper.js';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import ProfilePicture from '../components/profilePicture.js';

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
      <PageWrapper>
      <Loading />
      </PageWrapper>

    );
  }
  else {
    return (
      <PageWrapper>
        {club ? //its null getItem only brings the club name -f
          (
            <>
              <ClubEdit club={club} />
            </>
          ) : (
            <>
            {data.length > 0 ? (
              
              data.map(({ name, founder, description, card, point, photo }) => (
                <>
            <Link to={"/dashboard/" + name} key={name}>
                <div className='post club' id={card}>
                  <div className='club-content'>
                    <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/club-images/' + photo} size='m' />
                    <div>
                    <h1 className='decorated'>{name}</h1>
                    <p>{description}</p>
                    </div>
                  </div>
                </div>
              </ Link>
                </>
              ))

            ) : (<></>)}
            <ClubSetup />
              {console.log(club)}

            </>
          )
        }
      </PageWrapper>
    )
  }

};

export default Dashboard;