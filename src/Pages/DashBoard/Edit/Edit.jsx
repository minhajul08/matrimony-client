import { useForm } from "react-hook-form";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
const Edit = () => {
  const navigate = useNavigate ();
  const {user} = useAuth ();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imageBB and then get a url
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    if (res.data.success) {
      const addItem = {
        
        gender:data.bioDataType,
        name: data.name,
        fatherName: data.fatherName,
        motherName: data.motherName,
        permanentDivision: data.permanentDivision,
        presentDivision: data.presentDivision,
        date: data.date,
        height: data.height,
        weight: data.weight,
        age: data.age,
        partnerAge: data.partnerAge,
        occupation: data.occupation,
        partnerHeight: data.partnerHeight,
        partnerWeight: data.partnerWeight,
        race: data.race,
        mobile: data.mobile,
        email: data?.email,
        image: res.data.data.display_url
      }
      const bioData = await axiosPublic.post ('/bioData', addItem)
      console.log (bioData.data)
      if (bioData.data.insertedId) {
           reset ();
           navigate ('/dashboard/view')
           Swal.fire({
            position: "top-end",
            icon: "success",
            title: "BioData will be created successfully and edited successfully ",
            showConfirmButton: false,
            timer: 1500
            
          });
          
      }
    }
  }
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit BioData</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=' flex justify-between gap-5'>
            {/* BioData Types */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">BioData Type</span>

              </label>
              <select {...register("bioDataType", { required: true })} className="select select-bordered w-full" defaultValue="">
                <option value="" disabled>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>

              </select>
              {errors.bioDataType && <span className="text-red-500">biodata filed is required!</span>}
            </div>

            {/* Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" placeholder="Name" className="input input-bordered"
                {...register("name", { required: true })} />
              {errors.name && <span className="text-red-500">name filed is required!</span>}
            </div>



          </div>
          <div className="flex justify-between gap-5 mb-3">
            {/* Father's name */}


            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Father's Name</span>
              </label>
              <input type="text" name="fatherName" placeholder="Father'Name" className="input input-bordered"
                {...register("fatherName", { required: true })} />
              {errors.fatherName && <span className="text-red-500">father name filed is required</span>}
            </div>


            {/* Mother's name */}

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Mother's Name</span>
              </label>
              <input type="text" name="motherName" placeholder="Mother Name" className="input input-bordered"
                {...register("motherName", { required: true })} />
              {errors.motherName && <span className="text-red-500">mother name filed is required</span>}
            </div>
          </div>
          <div className="flex gap-5">

            {/* permanent division */}


            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Permanent Division</span>

              </label>
              <select {...register("permanentDivision", { required: true })} className="select select-bordered w-full" defaultValue="">
                <option value="" disabled>Select</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattagram">Chattagram</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Barisal">Barisal</option>
                <option value="Khulna">Khulna</option>
                <option value="Maymansingh">Maymansingh</option>
                <option value="Sylhet">Sylhet</option>

              </select>
              {errors.permanentDivision && <span className="text-red-500">permanent division filed is required!</span>}
            </div>


            {/* present division */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Present Division</span>

              </label>
              <select {...register("presentDivision", { required: true })} className="select select-bordered w-full" defaultValue="">
                <option value="" disabled>Select</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattagram">Chattagram</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Barisal">Barisal</option>
                <option value="Khulna">Khulna</option>
                <option value="Maymansingh">Maymansingh</option>
                <option value="Sylhet">Sylhet</option>

              </select>
              {errors.presentDivision && <span className="text-red-500">present division filed is required!</span>}
            </div>
          </div>


          {/* date of birth */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Date of Birth</span>
            </label>
            <input type="date" name="date" placeholder="Date of Birth" className="input input-bordered"
              {...register("date", { required: true })} />
            {errors.date && <span className="text-red-500">date of birth filed is required!</span>}
          </div>

          {/* height */}
          <div className="flex gap-5">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Height (in feet & inches):</span>

              </label>
              <select {...register("height", { required: true })} className="select select-bordered w-full" defaultValue="">
                <option value="" disabled>select</option>
                <option value="4 ft">4 ft</option>
                <option value="4 ft 1 in">4 ft 1 in</option>
                <option value="4 ft 2 in">4 ft 2 in</option>
                <option value="4 ft 3 in">4 ft 3 in</option>
                <option value="4 ft 4 in">4 ft 4 in</option>
                <option value="4 ft 5 in">4 ft 5 in</option>
                <option value="4 ft 6 in">4 ft 6 in</option>
                <option value="4 ft 7 in">4 ft 7 in</option>
                <option value="4 ft 8 in">4 ft 8 in</option>
                <option value="4 ft 9 in">4 ft 9 in</option>
                <option value="5 ft">5 ft</option>
                <option value="5 ft 1 in">5 ft 1 in</option>
                <option value="5 ft 2 in">5 ft 2 in</option>
                <option value="5 ft 3 in">5 ft 3 in</option>
                <option value="5 ft 4 in">5 ft 4 in</option>
                <option value="5 ft 5 in">5 ft 5 in</option>
                <option value="5 ft 6 in">5 ft 6 in</option>
                <option value="5 ft 7 in">5 ft 7 in</option>
                <option value="5 ft 8 in">5 ft 8 in</option>
                <option value="5 ft 9 in">5 ft 9 in</option>
                <option value="6 ft">6 ft</option>
                <option value="6 ft 1 in">6 ft 1 in</option>
                <option value="6 ft 2 in">6 ft 2 in</option>
                <option value="6 ft 3 in">6 ft 3 in</option>
                <option value="6 ft 4 in">6 ft 4 in</option>
                <option value="6 ft 5 in">6 ft 5 in</option>
              </select>
              {errors.height && <span className="text-red-500">height filed is required!</span>}
            </div>

            {/* weight */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Weight (in kg):</span>

              </label>
              <select {...register("weight", { required: true })} className="select select-bordered w-full" defaultValue="">
                <option value="" disabled>select</option>
                <option value="40">40 kg</option>
                <option value="45">45 kg</option>
                <option value="50">50 kg</option>
                <option value="55">55 kg</option>
                <option value="60">60 kg</option>
                <option value="65">65 kg</option>
                <option value="70">70 kg</option>
                <option value="75">75 kg</option>
                <option value="80">80 kg</option>
                <option value="85">85 kg</option>
                <option value="90">90 kg</option>
                <option value="95">95 kg</option>
                <option value="100">100 kg</option>
                <option value="105">105 kg</option>
                <option value="110">110 kg</option>
                <option value="115">115 kg</option>
                <option value="120">120 kg</option>
                <option value="120+">120 kg +</option>
              </select>
              {errors.weight && <span className="text-red-500">weight filed is required!</span>}
            </div>
          </div>

          {/* age */}
          <div className="flex gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input type="number" name="age" placeholder="age" className="input input-bordered"
                {...register("age", { required: true })} />
              {errors.age && <span className="text-red-500">age filed is required</span>}
            </div>


            {/* Expected Partner Age */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Expected Partner Age</span>
              </label>
              <input type="number" name="partnerAge" placeholder="Expected Partner Age" className="input input-bordered"
                {...register("partnerAge", { required: true })} />
              {errors.partnerAge && <span className="text-red-500">partner age filed is required</span>}
            </div>
          </div>


          {/* Occupation */}
          <div className="flex gap-5">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Occupation</span>

              </label>
              <select {...register("occupation", { required: true })} className="select select-bordered w-full" defaultValue="">
                <option value="" disabled>select</option>
                <option value="Doctor">Doctor</option>
                <option value="Engineer">Engineer</option>
                <option value="Teacher">Teacher</option>
                <option value="Farmer">Farmer</option>
                <option value="Businessperson">Businessperson</option>
                <option value="Government Employee">Government Employee</option>
                <option value="Software Developer">Software Developer</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Lawyer">Lawyer</option>
                <option value="Nurse">Nurse</option>
                <option value="Banker">Banker</option>
                <option value="Journalist">Journalist</option>
                <option value="Police Officer">Police Officer</option>
                <option value="Army Personnel">Army Personnel</option>
                <option value="Mechanic">Mechanic</option>
                <option value="Electrician">Electrician</option>
                <option value="Driver">Driver</option>
                <option value="Tailor">Tailor</option>
                <option value="Artist">Artist</option>
                <option value="Photographer">Photographer</option>
                <option value="Chef">Chef</option>
                <option value="Construction Worker">Construction Worker</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
              </select>
              {errors.occupation && <span className="text-red-500">occupation filed is required!</span>}
            </div>

            {/* Race */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Race</span>

              </label>
              <select {...register("race", { required: true })} className="select select-bordered w-full" defaultValue="">
                <option value="" disabled>select</option>
                <option value="Bengalis">Bengalis</option>
                <option value="Chakma">Chakma</option>
                <option value="Tripuri">Tripuri</option>
                <option value="Mro">Mro</option>
                <option value="Santal">Khulna</option>
                <option value="Marma">Marma</option>
                <option value="Khasi">Khasi</option>
                <option value="Manipuri">Manipuri</option>
              </select>
              {errors.race && <span className="text-red-500">race filed is required!</span>}
            </div>
          </div>


          {/* Expected Partner height */}
          <div className="flex gap-5">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Expected Partner Height (in feet & inches):</span>

              </label>
              <select {...register("partnerHeight", { required: true })} className="select select-bordered w-full" defaultValue="">
                <option value="" disabled>select</option>
                <option value="4 ft">4 ft</option>
                <option value="4 ft 1 in">4 ft 1 in</option>
                <option value="4 ft 2 in">4 ft 2 in</option>
                <option value="4 ft 3 in">4 ft 3 in</option>
                <option value="4 ft 4 in">4 ft 4 in</option>
                <option value="4 ft 5 in">4 ft 5 in</option>
                <option value="4 ft 6 in">4 ft 6 in</option>
                <option value="4 ft 7 in">4 ft 7 in</option>
                <option value="4 ft 8 in">4 ft 8 in</option>
                <option value="4 ft 9 in">4 ft 9 in</option>
                <option value="5 ft">5 ft</option>
                <option value="5 ft 1 in">5 ft 1 in</option>
                <option value="5 ft 2 in">5 ft 2 in</option>
                <option value="5 ft 3 in">5 ft 3 in</option>
                <option value="5 ft 4 in">5 ft 4 in</option>
                <option value="5 ft 5 in">5 ft 5 in</option>
                <option value="5 ft 6 in">5 ft 6 in</option>
                <option value="5 ft 7 in">5 ft 7 in</option>
                <option value="5 ft 8 in">5 ft 8 in</option>
                <option value="5 ft 9 in">5 ft 9 in</option>
                <option value="6 ft">6 ft</option>
                <option value="6 ft 1 in">6 ft 1 in</option>
                <option value="6 ft 2 in">6 ft 2 in</option>
                <option value="6 ft 3 in">6 ft 3 in</option>
                <option value="6 ft 4 in">6 ft 4 in</option>
                <option value="6 ft 5 in">6 ft 5 in</option>
              </select>
              {errors.partnerHeight && <span className="text-red-500">partner height filed is required!</span>}
            </div>

            {/* weight */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Expected Partner Weight (in kg):</span>

              </label>
              <select {...register("partnerWeight", { required: true })} className="select select-bordered w-full" defaultValue="">
                <option value="" disabled>select</option>
                <option value="40">40 kg</option>
                <option value="45">45 kg</option>
                <option value="50">50 kg</option>
                <option value="55">55 kg</option>
                <option value="60">60 kg</option>
                <option value="65">65 kg</option>
                <option value="70">70 kg</option>
                <option value="75">75 kg</option>
                <option value="80">80 kg</option>
                <option value="85">85 kg</option>
                <option value="90">90 kg</option>
                <option value="95">95 kg</option>
                <option value="100">100 kg</option>
                <option value="105">105 kg</option>
                <option value="110">110 kg</option>
                <option value="115">115 kg</option>
                <option value="120">120 kg</option>
                <option value="120+">120 kg +</option>
              </select>
              {errors.partnerWeight && <span className="text-red-500">partner weight filed is required!</span>}
            </div>
          </div>

          {/* mobile number */}
          <div className="flex gap-5">
          <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Mobile Number</span>
              </label>
              <input type="number" name="mobile" placeholder="Mobile Number" className="input input-bordered"
                {...register("mobile", { pattern: /^[0-9]{10,11}$/ })} />
              {errors.mobile && <span className="text-red-500">please enter a valid mobile number!</span>}
            </div>


            {/* email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input readOnly type="email" name="email" placeholder="Email Address" value={user?.email} className="input input-bordered"
                {...register("email", { required: true })} />
              {errors.email && <span className="text-red-500">email  filed is required</span>}
            </div>
          </div>

          {/* image filed */}
          <div className="form-control w-full my-6">
            <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200 transition duration-300"
            >
              Save and Publish Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;