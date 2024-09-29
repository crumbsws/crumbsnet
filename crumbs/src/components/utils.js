
export async function fetchProfile(user, setData) {
    
    try{
      const response = await fetch(process.env.REACT_APP_API_URL + '/getprofile.php', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          user: user
        })
      });
      const data = await response.json();
      setData(data);

    }
    catch(err){
      console.log(err);
    }
}

export async function doSearch(query, type, setData) {
  setData([]); //unline others, the body of the json changes so its better to keep this here
  try
  {
      
      const response = await fetch(process.env.REACT_APP_API_URL + '/search.php', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
              value: query,
              type: type
            })
        });
      const data = await response.json();
      setData(data);
      window.scrollTo({top: 0, behavior: 'smooth'});
}//the type is changed with a latency causing in type shift type shit -fixed with the setData on top
catch(err)
{
  console.log(err);
} 
}

export async function getItem(item, setItem, setLoading){
  try
  {
      
      const response = await fetch(process.env.REACT_APP_API_URL + '/get.php', {
          credentials: 'include',
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
              item: item
            })
        });
      const data = await response.json();
      setItem(data);
      setLoading(false);
     
}
catch(err)
{
  console.log(err);
} 
}

export async function getRequests(type, setData){
  try
  {
      
      const response = await fetch(process.env.REACT_APP_API_URL + '/getrequests.php', {
          credentials: 'include',
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
              type: type
            })
        });
      const data = await response.json();
      setData(data);
     
}
catch(err)
{
  console.log(err);
} 
}
