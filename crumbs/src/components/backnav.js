import { useNavigate } from "react-router-dom";
function BackNav() {
    let navigate = useNavigate();
    return  <>

  <div className="post" id="navigator">
    <span onClick={() => navigate(-1)}><i class="fa-solid fa-angle-left"></i></span>
  </div>



</>;
  
};

export default BackNav;