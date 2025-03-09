
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getPostData, Shorten, Linkify, isVideoFile } from "./../../components/utils.js";
import BackNav from "../../components/navigation/backnav.js";
import Loading from "../../components/loading.js";
import PostTemplate from "../../components/templates/postTemplate.js";

function Pin() {

  const clubs = useSelector((state) => state.user.clubs);

  const [value, setValue] = useState('Submit');
  const [quote, setQuote] = useState('');
  const [club, setClub] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.data[0].name);
  const { url, type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!url) return;

    if (type === 'post') {
      getPostData(url, setData, setLoading);
    }
  }, [url, type]);

  useEffect(() => {
    if (clubs && Object.values(clubs).length > 0) {
      setClub(Object.values(clubs)[0].name);
    }
  }, [clubs]);

  const handleQuote = (e) => {
    setQuote(e.target.value);
  }

  const handleClub = (e) => {
    setClub(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setValue('Publishing...');
    const formData = new FormData();
    formData.append('category', 'pin')
    formData.append('type', type)
    formData.append('quote', quote)
    formData.append('url', url)
    formData.append('club', club)


    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/publish.php', {
        credentials: 'include',
        method: 'POST',
        body: formData
      })
      const data = await response.json();


      if (data.state === 'success') {
        navigate('/view/' + data.id);
      }
    } catch (err) {
      console.log(err);
      setValue('An error occured');

    }
  }


  if (Object.values(clubs).length === 0) {
    return navigate('/clubs');
  }
  else {


    return (

      <>
        <BackNav />
        <div className='publish post'>
          <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
            <input type="text" name="quote" id="quote" value={quote} placeholder="Add context" minLength="3" maxLength="28" onChange={handleQuote} required />
            <div>

              <select onChange={handleClub} id='access'>
                {clubs && Object.values(clubs).map(({ name  }) => (
                  <>
                    <option value={name}>{name}</option>
                  </>
                ))}
              </select>
            </div>


            <div>
            </div>


            {data.length > 0 ? (
              <PostTemplate data={data} user={user} />
            ) : (<Loading />)}

            <input type="submit" value={value} />
          </form>




        </div>

      </>
    );
  }
}

export default Pin;
