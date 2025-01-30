import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doSearch } from '../components/utils.js';
import PageWrapper from '../components/pageWrapper.js';
import Display from '../components/display.js';
function Discover() {
  const { value } = useParams();
  const [type, setType] = useState('post');
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(value || "");
  useEffect(() => {
      doSearch(query, type, setData)
    }, [query, type])

    function handleSelect(e){

      setType(e.target.value);
    }
    function handleValue(e){
      setQuery(e.target.value);
    }
    function handleSubmit(e){
      e.preventDefault();
    }
    

    return (
      <PageWrapper>
        <form  onSubmit={handleSubmit}>
          <input 
            type='search' 
            placeholder='Search on crumbs...' 
            value={query} 
            onChange={handleValue} 
          />
          <select id='small' onChange={handleSelect}>
            <option value="post">Posts</option>
            <option value="people">People</option>
          </select>
        </form>
    
        {data.length === 0 ? (
          <>
          {query === '' ? (
            <Display type = 'posts' parent = 'public' />
          ) : (
            <></>
          )
          }
          
          </>
        ) : (
          <>
            {type === 'people' ? (
              <>
                {data.map(({ name, home, relation }) => (
                  <Link to={`/people/${name}`} key={name}>
                    <div className='post'>
                      <h2>{name}</h2> 
                      <p className='email'>{home} ︱ {relation}</p>
                    </div>
                  </Link>
                ))}
              </>
            ) : ( 
              <>
                {data.map(({ name, title, url, body, date, conf, collect, parent }) => (
                  <Link to={`/view/${url}`} key={url}>
                    <div className='post'>
                      {title ? (
                        <h2>{title}</h2> 
                      ) : (
                        <p>Reply to <strong>{parent}</strong></p>
                      )}
                      {conf && (
                        <img src={process.env.REACT_APP_API_URL + `/images/${conf}`} alt='' />
                      )}
                      <p>{body}</p>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </>
        )}
      </PageWrapper>
    );
    
}



export default Discover;
