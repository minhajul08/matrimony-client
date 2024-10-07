import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Register = () => {
  const {crateUser} = useContext (AuthContext)
  const navigate = useNavigate ();
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm()
      const onSubmit = (data) => {
        console.log (data)
        crateUser (data.email,data.password)
        .then ((loggedUser) => {
           console.log (loggedUser.user)
        })
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Register successfully",
  showConfirmButton: false,
  timer: 1500
});
navigate ('/login')
      }
    return (
        <div>
           <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content">

    <div className="card bg-base-100  shrink-0 shadow-2xl">
        <h1 className='text-5xl text-center text-bold px-10 py-5'>Register Now!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input {...register("name", { required: true })}  type="text" name='name' placeholder="Name" className="input input-bordered"  />
          {errors.name && <p className='text-red-700'>name filed is required</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input {...register("email", {required: true})} type="email" name='email' placeholder="email" className="input input-bordered"  />
          {errors.email && <p className='text-red-700'>email filed is required</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input {...register('image', {required: true})} type="text" name='image' placeholder="Photo URl" className="input input-bordered"  />
          {errors.image && <p className='text-red-700'>password filed is required</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" {...register("password", {
                  required: true, minLength: 8, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
                })} className="input input-bordered" />
                {errors.password?.type === "required" && (
                  <p className="text-red-700" role="alert">password filed is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-700" role="alert">password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-700" role="alert">password must be less than 20 characters</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-700" role="alert">password must be one uppercase letter, one lowercase letter, one number and one special character</p>
                )}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
        <p className='text-base my-3'>Already have an account <Link className='text-blue-700 btn-link' to='/login'>Login</Link></p>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;