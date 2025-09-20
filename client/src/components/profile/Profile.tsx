import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";

export default function Profile(){
    const { theme }=useSelector((state:RootState)=>state.theme);
    const { user }=useSelector((state:RootState)=>state.user);
    const dispath=useDispatch();

    return (
        <div>
            <p>Profile works {user?._id}</p>
        </div>
    )
}