import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {googleLogin} = useAuth ();
    const axiosPublic = useAxiosPublic ();
    const navigate = useNavigate ();
    const handelGoogleLogin = () => {
        googleLogin ()
        .then (result => {
            console.log (result.user)
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post ('/users', userInfo)
            .then (res => {
                console.log (res.data)
                navigate ('/')
            })
        })
    }
    return (
        <div className='form-control p-5 mx-6'>
        <button onClick={handelGoogleLogin} className='btn btn-full btn-outline'> <FcGoogle  className='text-xl'/> Google</button>
       </div>
    );
};

export default SocialLogin;