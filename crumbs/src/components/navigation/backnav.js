import { useNavigate } from "react-router-dom";
function BackNav({children}) {
    let navigate = useNavigate();
    return  <>

  <div className="post" id="navigator">
    <span onClick={() => navigate(-1)}><i class="fa-solid fa-angle-left"></i></span>
    {children}
    
  </div>



</>;
  
};

export default BackNav;