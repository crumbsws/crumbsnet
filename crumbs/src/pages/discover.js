import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doSearch } from '../components/utils.js';
import PageWrapper from '../components/pageWrapper.js';
import Display from '../components/display.js';
import PostTemplate from '../components/templates/postTemplate.js';
import { useSelector } from 'react-redux';
import PeopleTemplate from '../components/templates/peopleTemplate.js';
function Discover() {
  const { value } = useParams();
  const [type, setType] = useState('post');
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(value || "");
const user = useSelector((state) => state.user.data[0].name);

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
              <PeopleTemplate data={data} />
            ) : ( 
             <PostTemplate data={data} user={user} />
            )}
          </>
        )}
      </PageWrapper>
    );
    
}



export default Discover;
