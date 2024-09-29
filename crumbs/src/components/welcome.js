import { Link } from "react-router-dom";
function Welcome() {
    return  <>

  <div className="welcome">
    <h2>Life is better in</h2>
    <h1>
      <strong>Crumbs</strong>
    </h1>
    <h2>
      See what people <br />
      are doing.
    </h2>
    <p><Link to="/register">Register</Link> | <Link to="/login">Login</Link></p>
  </div>



</>;
  
};

export default Welcome;