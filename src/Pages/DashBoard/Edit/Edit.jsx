import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../providers/AuthProvider';
import { useParams } from 'react-router-dom';

const Edit = () => {
  const {id} = useParams ()
  const {user} = useContext (AuthContext)
  const [errors, setErrors] = useState({});
  const [biodata, setBiodata] = useState({
    type: '',
    name: user?.displayName,
    profileImage: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    age: '',
    occupation: '',
    race: '',
    fathersName: '',
    mothersName: '',
    permanentDivision: '',
    presentDivision: '',
    partnerAge: '',
    partnerHeight: '',
    partnerWeight: '',
    contactEmail: user?.email, // readonly
    mobileNumber: '',
  });

  // const [biodataId, setBiodataId] = useState(null);
 

  // Fetching last biodata ID from the backend to auto-generate new one
  // useEffect(() => {
  //   async function fetchLastBiodataId() {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/bioDataDetails/${id}`);
  //       console.log (response.data)
  //       const lastId = response.data || 0;
  //       setBiodataId(lastId + 1);
  //     } catch (error) {
  //       console.error("Error fetching last biodata ID", error);
  //     }
  //   }
  //   fetchLastBiodataId();
  // }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!biodata.type) newErrors.type = 'Biodata type is required';
    if (!biodata.name) newErrors.name = 'Name is required';
    if (!biodata.height) newErrors.height = 'Height is required';
    if (!biodata.weight) newErrors.weight = 'Weight is required';
    if (!biodata.age) newErrors.age = 'Age is required';
    if (!biodata.occupation) newErrors.occupation = 'Occupation is required';
    if (!biodata.race) newErrors.race = 'Race is required';
    if (!biodata.permanentDivision) newErrors.permanentDivision = 'Permanent Division is required';
    if (!biodata.presentDivision) newErrors.presentDivision = 'Present Division is required';
    if (!biodata.partnerHeight) newErrors.partnerHeight = 'Expected Partner Height is required';
    if (!biodata.partnerWeight) newErrors.partnerWeight = 'Expected Partner Weight is required';
    if (!biodata.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (biodata.mobileNumber && !/^\d{11}$/.test(biodata.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setBiodata({ ...biodata, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log (biodata)
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // try {
    //   const response = await axios.post('/api/biodata', {
    //     ...biodata,
    //      // Auto-generated ID
    //   });
    //   alert('Biodata saved successfully');
    // } catch (error) {
    //   console.error('Error saving biodata', error);
    // }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Biodata</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className=' flex justify-between gap-5'>
          {/* Biodata Type */}
        <div className='form-control w-full'>
          <label className="block text-gray-700 font-medium">Biodata Type:</label>
          <select
            name="type"
            value={biodata.type}
            onChange={handleChange}
            className={`mt-1 p-2 border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-indigo-200`}
            
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>

        {/* Name */}
        <div className='form-control w-full'>
          <label className="block text-gray-700 font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={biodata.name}
            onChange={handleChange}
            className={`mt-1 p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-indigo-200`}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        </div>

         {/* father name & mother name  */} 

       <div className='flex justify-between gap-5'>
         {/* Fathers Name */}
         <div className='form-control w-full'>
          <label className="block text-gray-700 font-medium">Father's Name:</label>
          <input
            type="text"
            name="fathersName"
            value={biodata.fathersName}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
          />
        </div>

        {/* Mothers Name */}
        <div className='form-control w-full'>
          <label className="block text-gray-700 font-medium">Mother's Name:</label>
          <input
            type="text"
            name="mothersName"
            value={biodata.mothersName}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
          />
        </div>
       </div>

       {/* Permanent Division & present division */}
<div className='flex justify-between gap-5'>
          {/* Permanent Division */}
          <div className='form-control w-1/2'>
          <label className="block text-gray-700 font-medium">Permanent Division:</label>
          <select
            name="permanentDivision"
            value={biodata.permanentDivision}
            onChange={handleChange}
            className={`mt-1 p-2 border ${errors.permanentDivision ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-indigo-200`}
            required
          >
            <option value="">Select</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattagram">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Maymansingh">Maymansingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
          {errors.permanentDivision && <p className="text-red-500 text-sm mt-1">{errors.permanentDivision}</p>}
        </div>

        {/* Present Division */}
        <div className='form-control w-1/2'>
          <label className="block text-gray-700 font-medium">Present Division:</label>
          <select
            name="presentDivision"
            value={biodata.presentDivision}
            onChange={handleChange}
            className={`mt-1 p-2 border ${errors.presentDivision ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-indigo-200`}
            required
          >
            <option value="">Select</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattagram">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Maymansingh">Maymansingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
          {errors.presentDivision && <p className="text-red-500 text-sm mt-1">{errors.presentDivision}</p>}
        </div>
</div>


        {/* Date of Birth */}
        <div>
          <label className="block text-gray-700 font-medium">Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={biodata.dateOfBirth}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            required
          />
        </div>

      {/* height and weight */}

      <div className='flex justify-between gap-5'>
          {/* Height */}
          <div className='form-control w-full'>
  <label className="block text-gray-700 font-medium">Height (in feet & inches):</label>
  <select
    name="height"
    value={biodata.height}
    onChange={handleChange}
    className={`mt-1 w-full p-2 border ${errors.height ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-indigo-200`}
    required
  >
    <option value="">Select Height</option>
    <option value="4'0">4'0"</option>
    <option value="4'1">4'1"</option>
    <option value="4'2">4'2"</option>
    <option value="4'3">4'3"</option>
    <option value="4'4">4'4"</option>
    <option value="4'5">4'5"</option>
    <option value="4'6">4'6"</option>
    <option value="4'7">4'7"</option>
    <option value="4'8">4'8"</option>
    <option value="4'9">4'9"</option>
    <option value="5'0">5'0"</option>
    <option value="5'1">5'1"</option>
    <option value="5'2">5'2"</option>
    <option value="5'3">5'3"</option>
    <option value="5'4">5'4"</option>
    <option value="5'5">5'5"</option>
    <option value="5'6">5'6"</option>
    <option value="5'7">5'7"</option>
    <option value="5'8">5'8"</option>
    <option value="5'9">5'9"</option>
    <option value="6'0">6'0"</option>
    <option value="6'1">6'1"</option>
    <option value="6'2">6'2"</option>
    <option value="6'3">6'3"</option>
    <option value="6'4">6'4"</option>
    <option value="6'5">6'5"</option>
  </select>
  {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
</div>


        {/* Weight */}
        <div className='form-control w-full'>
  <label className="block text-gray-700 font-medium">Weight (in kg):</label>
  <select
    name="weight"
    value={biodata.weight}
    onChange={handleChange}
    className={`mt-1 w-full p-2 border ${errors.weight ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-indigo-200`}
    required
  >
    <option value="">Select Weight</option>
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
  {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
</div>
      </div>


       {/* age */} 

       <div className='flex justify-between gap-5'>
         {/* Age */}
         <div className='form-control w-full'>
          <label className="block text-gray-700 font-medium">Age:</label>
          <input
            type="number"
            name="age"
            value={biodata.age}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            required
          />
        </div>

          {/* Expected Partner Age */}
          <div className='form-control w-full'>
          <label className="block text-gray-700 font-medium">Expected Partner Age:</label>
          <input
            type="number"
            name="partnerAge"
            value={biodata.partnerAge}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
          />
        </div>
       </div>

        <div className='flex justify-between gap-5'>
          {/* Occupation */}
        <div className='form-control w-full'>
  <label className="block text-gray-700 font-medium">Occupation:</label>
  <select
    name="occupation"
    value={biodata.occupation}
    onChange={handleChange}
    className={`mt-1 w-full p-2 border ${errors.occupation ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-indigo-200`}
    required
  >
    <option value="">Select Occupation</option>
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
  {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
</div>


        {/* Race */}
        <div className='form-control w-full'>
          <label className="block text-gray-700 font-medium">Race</label>
          <select
            name="race"
            value={biodata.race}
            onChange={handleChange}
            className={`mt-1 w-full p-2 border ${errors.race ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-indigo-200`}
            required
          >
            <option value="">Select</option>
            <option value="Bengalis">Bengalis</option>
            <option value="Chakma">Chakma</option>
            <option value="Tripuri">Tripuri</option>
            <option value="Mro">Mro</option>
            <option value="Santal">Khulna</option>
            <option value="Marma">Marma</option>
            <option value="Khasi">Khasi</option>
            <option value="Manipuri">Manipuri</option>
          </select>
          {errors.race && <p className="text-red-500 text-sm mt-1">{errors.race}</p>}
        </div>
        </div>

      



      

    {/* height & weight  */}

    <div className='flex justify-between gap-5'>
          {/* Expected Partner Height */}
          <div className='form-control w-full'>
  <label className="block text-gray-700 font-medium">Expected Partner Height (in feet & inches):</label>
  <select
    name="partnerHeight"
    value={biodata.partnerHeight}
    onChange={handleChange}
    className={`mt-1 w-full p-2 border ${errors.partnerHeight ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-indigo-200`}
    required
  >
    <option value="">Select Height</option>
    <option value="4'0">4'0"</option>
    <option value="4'1">4'1"</option>
    <option value="4'2">4'2"</option>
    <option value="4'3">4'3"</option>
    <option value="4'4">4'4"</option>
    <option value="4'5">4'5"</option>
    <option value="4'6">4'6"</option>
    <option value="4'7">4'7"</option>
    <option value="4'8">4'8"</option>
    <option value="4'9">4'9"</option>
    <option value="5'0">5'0"</option>
    <option value="5'1">5'1"</option>
    <option value="5'2">5'2"</option>
    <option value="5'3">5'3"</option>
    <option value="5'4">5'4"</option>
    <option value="5'5">5'5"</option>
    <option value="5'6">5'6"</option>
    <option value="5'7">5'7"</option>
    <option value="5'8">5'8"</option>
    <option value="5'9">5'9"</option>
    <option value="6'0">6'0"</option>
    <option value="6'1">6'1"</option>
    <option value="6'2">6'2"</option>
    <option value="6'3">6'3"</option>
    <option value="6'4">6'4"</option>
    <option value="6'5">6'5"</option>
  </select>
  {errors.partnerHeight && <p className="text-red-500 text-sm mt-1">{errors.partnerHeight}</p>}
</div>


        {/* Expected Partner Weight */}
        <div className='form-control w-full'>
  <label className="block text-gray-700 font-medium">Expected Partner Weight (in kg):</label>
  <select
    name="partnerWeight"
    value={biodata.partnerWeight}
    onChange={handleChange}
    className={`mt-1 w-full p-2 border ${errors.partnerWeight ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-indigo-200`}
    required
  >
    <option value="">Select Weight</option>
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
  {errors.partnerWeight && <p className="text-red-500 text-sm mt-1">{errors.partnerWeight}</p>}
</div>
    </div>

     {/* mobile number & contract email */}
     <div className='flex justify-between gap-5'>
         {/* Mobile Number */}
         <div className='form-control w-full'>
          <label className="block text-gray-700 font-medium">Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={biodata.mobileNumber}
            onChange={handleChange}
            className={`mt-1 w-full p-2 border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring focus:ring-indigo-200`}
            required
          />
          {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
        </div>

        {/* Contact Email (Read-only) */}
        <div className='form-control w-full'>
          <label className="block text-gray-700 font-medium">Contact Email:</label>
          <input
            type="email"
            value={biodata.contactEmail}
            readOnly
            className="mt-1 w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
          />
        </div>
     </div> 

      {/* Profile Image */}
      <div>
          <label className="block text-gray-700 font-medium">Profile Image Link:</label>
          <input
            type="file"
            name="profileImage"
            value={biodata.profileImage}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
          />
        </div>

        {/* Save Button */}
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
  );
};

export default Edit;
