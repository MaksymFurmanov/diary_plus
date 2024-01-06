import { FaCircleArrowLeft } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

const PageTitle = ({name, prev = "/navigation"}) => {
    const navigate = useNavigate();

    return <div className={"PageTitle"}>
        <button onClick={() => navigate(prev)}>
            <FaCircleArrowLeft/>
        </button>
        <h1>{name}</h1>
    </div>
}

export default PageTitle;