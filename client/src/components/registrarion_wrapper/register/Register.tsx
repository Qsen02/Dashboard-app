import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/state/store"

export default function Register(){
    const { user }=useSelector((state:RootState)=>state.user);
    const { theme }=useSelector((state:RootState)=>state.theme);
    const dispatch=useDispatch();

    return (
        <div>
            <h1>Register works!</h1>
        </div>
    )
}