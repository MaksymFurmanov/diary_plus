import {FaCircleArrowLeft} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

const PageTitle = ({name, onBack}) => {
    const navigate = useNavigate();
    if(!onBack) {
        onBack = () => navigate("/navigation");
    }

    return <div className={"PageTitle"}>
        <button onClick={onBack}>
            <FaCircleArrowLeft/>
        </button>
        <h1>{name}</h1>
    </div>
}

export default PageTitle;