import ClubMenu from '../components/clubs/clubMenu.js';
import ExploreClubs from '../components/clubs/exploreClubs.js';
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import PageWrapper from '../components/pageWrapper.js';
import DefaultBar from '../components/navigation/defaultbar.js';
import { getOtherClub, Shorten } from '../components/utils.js';
import Loading from '../components/loading.js';
import ProfilePicture from '../components/profilePicture.js';
import Icons from '../icons/iconlibrary.js';

function Clubs() {

  const {club} = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); //edit defbar

useEffect(() => {
  if (club) {
  setLoading(true);
  getOtherClub(club, setData, setLoading);   
  }

}, [club]);


if (!club) {
  return (
    <PageWrapper>
      <ExploreClubs />
    </PageWrapper>
  );
}

// Show loading state
if (loading) {
  return (
    <PageWrapper>
      <Loading />
    </PageWrapper>
  );
}

if (!loading && data.length === 0) {
  return (
    <PageWrapper>
        <p>No club found with this name</p>
    </PageWrapper>
  );
}

if (!loading && data.length > 0) {
return (
  <>
    {data.map(({ name, founder, description, point, photo }, index) => (
      <Fragment key={index}>
        <DefaultBar>
          <div className='post '>
          <ProfilePicture src={process.env.REACT_APP_CDN_URL + '/club-images/' + photo} size='l' />
          <h2>{Shorten(name, 12)}</h2>
          <p className='email'>Founded by {founder}</p>

          </div>

          <div className='post '>
          <p>{description}</p>
          <p><Icons icon='pointSmall' /> {point}</p>

          </div>

        </DefaultBar>
        <PageWrapper>
          <ClubMenu data={data} />
        </PageWrapper>
        </Fragment>
    ))}
  </>
);
}

  };

  export default Clubs;