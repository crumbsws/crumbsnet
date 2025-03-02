
import { Outlet, useNavigate } from "react-router-dom";
import PageWrapper from "../components/pageWrapper";

function Publish() {

    return (
      <PageWrapper>
        <Outlet />
        </PageWrapper>
      
  );
};

export default Publish;
