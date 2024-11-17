import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom"; // Assuming you're using react-router-dom
import { IoMdPhonePortrait } from "react-icons/io";
import img1 from '../../../../assets/icon/age.png';
import img2 from '../../../../assets/icon/location.png';
import img3 from '../../../../assets/icon/height.png';
import img4 from '../../../../assets/icon/candel.png';
import { AiOutlineMail } from "react-icons/ai";
import {  FaLocationDot } from "react-icons/fa6";
import { ImFileEmpty } from "react-icons/im";
import { FiChevronRight } from 'react-icons/fi';
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const BioDataDetailsPage = () => {
  const { id } = useParams(); 
  const [bioData, setBioData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate ();
  const {user} = useAuth ();
  const axiosSecure = useAxiosSecure ();
  const handelAddFavorite = () => {
    if (user && user.email) {
        const addFavorite = {
          id:bioData.id,
          name:bioData.name,
          permanentAddress:bioData.division,
          email:user?.email,
          occupation:bioData.occupation,
        }
        axiosSecure.post('/favorite',addFavorite)
        .then (res => {
          if (res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${bioData.name}added to favorite list`,
              showConfirmButton: false,
              timer: 1500
            });
            navigate ('/dashboard/favorite')
          }
        })
    }
    else {
      Swal.fire({
        title: "you are not login?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bioDataDetails/${id}`);
        const data = await response.json();
        setBioData(data); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching biodata:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Helmet>
        <title>
          BioData | Details Page
        </title>
      </Helmet>
      {bioData ? (
        <div className="grid grid-cols-12 gap-10 my-20 border border-red-700 font-sans"> 
       <div className="col-span-2 border border-red-600">
       <img className="" src={bioData.image} alt="" />
       </div>
          <div className="col-span-10   border border-red-600 space-y-5 p-5">
          <p className="uppercase text-4xl"><strong> {bioData.name} </strong> </p>

          <div className="grid grid-cols-7 items-center gap-3">
            <div className="flex flex-col justify-center items-center p-8 rounded-lg  border border-gray-500 ">
              <p className="text-3xl">
              <img src={img2} alt="" />
              </p>
              <p className="text-xl">City</p>
              <p className="text-2xl">
              
                {bioData.division}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center p-8 rounded-lg  border border-gray-500 ">
              <img src={img1} alt="" />
              <p className="text-xl">Age</p>
              <p className="text-2xl">
                {bioData.age}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center p-8 rounded-lg  border border-gray-500 ">
              <p className="text-3xl">
                <img src={img3} alt="" />
              </p>
              <p className="text-xl">Height</p>
              <p className="text-2xl">
                {bioData.height}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center p-8 rounded-lg  border border-gray-500 ">
              <p className="text-3xl">
              <img src={img4} alt="" />
              </p>
              <p className="text-xl">Religion</p>
              <p className="text-2xl">
                {bioData.religion}
              </p>
            </div>
          </div>
        
        
        <div>
        <p className="uppercase text-2xl"><strong>about</strong> </p>
          <p className="text-2xl"> {bioData.about}</p> 
          <div className="divider"></div>
       
         <div className="space-y-5 text-2xl">
         <p className="uppercase"><strong>Contract info</strong> </p>
         <p className="flex items-center  gap-2"><IoMdPhonePortrait className="border border-gray-500 rounded-lg text-3xl p-1 " /> <span>Phone:</span> {bioData.contact_info.phone} </p>
         <p className="flex items-center gap-2"><AiOutlineMail className="border border-gray-500 rounded-lg text-3xl p-1 " /> <span>Email:</span> {bioData.contact_info.email} </p>
         <p className="flex items-center gap-2"><FaLocationDot className="border border-gray-500 rounded-lg text-3xl p-1 " /> <span>Address:</span> {bioData.contact_info.email} </p>
         </div>
         <div className="divider"></div>
        
         <p className="uppercase text-2xl my-5 "><strong>Personal Information</strong> </p>
    <div className="flex flex-col md:flex-row md:justify-between font-sans text-[#4a3d3d] gap-10 text-xl">
   
      <div className="w-full md:w-1/2 space-y-2 mb-4 md:mb-0">
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Name:
          </span>
          <span>{bioData.name}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Mother's name:
          </span>
          <span>Joney family</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Date of birth:
          </span>
          <span>03 Jan 1998</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Height:
          </span>
          <span>{bioData.height}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Permanent address:
          </span>
          <span>{bioData.religion}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Race:
          </span>
          <span>{bioData.caste}</span>
        </p>
       
      </div>
      
      <div className="w-full md:w-1/2 space-y-2">
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Father's name:
          </span>
          <span>John Smith</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Family name:
          </span>
          <span>{bioData.name}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> age:
          </span>
          <span>{bioData.age}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Weight:
          </span>
          <span>{bioData.height}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Present address:
          </span>
          <span>{bioData.occupation}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Degree:
          </span>
          <span>{bioData.education}</span>
        </p>
       
    
      </div>
    </div>
        </div> 
        <div>
        <div className="divider"></div>
        <p className="uppercase text-2xl my-3 "><strong>Expected Partner</strong> </p>
        <div className="space-y-3 text-xl">
        <p className="flex  items-center gap-4">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Age:
          </span>
          <span>{bioData.age}</span>
        </p>
        <p className="flex  items-center gap-4">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Height:
          </span>
          <span>{bioData.height}</span>
        </p>
        <p className="flex  items-center gap-4">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Weight:
          </span>
          <span>nai</span>
        </p>
        </div>
        </div>
        <div>
          
            <button onClick={handelAddFavorite} className="btn mr-3 bg-[#06684d] text-white">Add to favorite</button>
             <button className="btn bg-yellow-500 text-white">Apply to premium</button>
          </div>
          </div> 
         
        </div>
         
      ) : (
        <div> <ImFileEmpty /> No biodata found.</div>
      )}
    </div>
  );
};

export default BioDataDetailsPage;

