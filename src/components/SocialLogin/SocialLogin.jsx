import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";


const SocialLogin = () => {
    const {googleLogin} = useAuth ();
    const handelGoogleLogin = () => {
        googleLogin ()
        .then (result => {
            console.log (result.user)
        })
    }
    return (
        <div className='form-control p-5 mx-6'>
        <button onClick={handelGoogleLogin} className='btn btn-full btn-outline'> <FcGoogle  className='text-xl'/> Google</button>
       </div>
    );
};

export default SocialLogin;