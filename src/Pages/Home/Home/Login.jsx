import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';


const Login = () => {
  const {signIn} = useContext (AuthContext)
  const navigate =  useNavigate ();
  const location = useLocation ();

  const from = location.state?.from?.pathname || "/";
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm()
      const onSubmit = (data) => {
        console.log (data)
        signIn (data.email,data.password)
        .then ((loggedUser) => {
           console.log (loggedUser.user)
        })
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate (from, {replace:true});
      }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content">
    <div className="card bg-base-100  shrink-0 shadow-2xl">
        <h1 className='text-5xl text-bold text-center px-10 py-3'>Login Now!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input  {...register("email", { required: true })}
        aria-invalid={errors.firstName ? "true" : "false"} name='email' type="text" placeholder="email" className="input input-bordered"  />
        {errors.email?.type === "required" && (
        <p className='text-red-700'>email is required</p>
      )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input {...register('password',{ required: true })} type="password" name='password' placeholder="password" className="input input-bordered"  />
          {errors.password?.type === "required" && (
        <p className='text-red-700'>password is required</p>
      )}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        <p className="my-3"> Don't have an account <Link className='text-blue-700 btn-link' to='/register'>Register</Link> </p>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;