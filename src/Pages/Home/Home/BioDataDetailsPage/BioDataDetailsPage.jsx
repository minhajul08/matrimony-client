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
          permanentAddress:bioData.permanentDivision,
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
        console.error("Error fetching bioData:", error);
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
        <div className="grid grid-cols-12 gap-10 lg:my-20  font-sans"> 
       <div className="col-span-12 lg:col-span-5">
       <img className="md:w-[1200px] lg:w-[600px] mx-auto" src={bioData.image} alt="" />
       <div className="flex justify-evenly lg:justify-between">
          
          <button onClick={handelAddFavorite} className="btn btn-wide rounded bg-[#06684d] text-white">Add to favorite</button>
           <button className="btn btn-wide rounded bg-yellow-500 text-white">Apply to premium</button>
        </div>
       </div>
          <div className="col-span-12 lg:col-span-7 space-y-5 p-2 lg:p-5">
          <p className="uppercase text-2xl lg:text-4xl"><strong> {bioData.name} </strong> </p>

          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
            <div className="flex flex-col justify-center items-center p-5 rounded-lg  border border-gray-500 ">
              <p className="text-3xl">
              <img src={img2} alt="" />
              </p>
              <p className="text-xl">City</p>
              <p className="text-xl">
              
                {bioData.permanentDivision}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center p-8 rounded-lg  border border-gray-500 ">
              <img src={img1} alt="" />
              <p className="text-xl">Age</p>
              <p className="text-xl">
                {bioData.age}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center p-8 rounded-lg  border border-gray-500 ">
              <p className="text-3xl">
                <img src={img3} alt="" />
              </p>
              <p className="text-xl">Height</p>
              <p className="text-xl">
                {bioData.height}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center p-8 rounded-lg  border border-gray-500 ">
              <p className="text-3xl">
              <img src={img4} alt="" />
              </p>
              <p className="text-xl mt-2">Race</p>
              <p className="text-xl">
                {bioData.race}
              </p>
            </div>
          </div>
         
        
        <div>
     
          <p className="text-2xl"> {bioData.about}</p> 
          <div className="divider"></div>
       
         <div className="space-y-5 text-2xl p-5">
         <p className="uppercase"><strong>Contract info</strong> </p>
         <p className="flex items-center  gap-2"><IoMdPhonePortrait className="border border-gray-500 rounded-lg text-3xl p-1 " /> <span>Phone:</span> {bioData.mobile} </p>
         <p className="flex items-center gap-2"><AiOutlineMail className="border border-gray-500 rounded-lg text-3xl p-1 " /> <span>Email:</span> {bioData.email} </p>
         <p className="flex items-center gap-2"><FaLocationDot className="border border-gray-500 rounded-lg text-3xl p-1 " /> <span>Address:</span> {bioData.permanentDivision} </p>
         </div>
         <div className="divider"></div>
        
         <p className="uppercase text-2xl  lg:my-5 p-5 lg:p-0"><strong>Personal Information</strong> </p>
    <div className="flex flex-col md:flex-row md:justify-between font-sans text-[#4a3d3d] gap-2 lg:gap-10 text-xl p-5 lg:p-0">
    
      <div className="w-full lg:w-1/2 space-y-2 mb-0 md:mb-0 p-0 md:p-0 lg:p-0">
        <p className="flex md:justify-between  lg:justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Name:
          </span>
          <span className="ml-32 md:ml-2 lg:ml-2">{bioData.name}</span>
        </p>
        <p className="flex md:justify-between lg:justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Mother's name:
          </span>
          <span className="ml-12 lg:ml-0">{bioData.motherName}</span>
        </p>
        <p className="flex md:justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Date of birth:
          </span>
          <span className="ml-[67px] md:ml-0">{bioData.date}</span>
        </p>
        <p className="flex md:justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Height:
          </span>
          <span className="ml-32 md:ml-0">{bioData.height}</span>
        </p>
        <p className="flex md:justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Permanent address:
          </span>
          <span className="ml-3 md:ml-0">{bioData.permanentDivision}</span>
        </p>
        <p className="flex md:justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Race:
          </span>
          <span className="ml-36 md:ml-0">{bioData.race}</span>
        </p>
       
      </div>
      
      <div className="w-full lg:w-1/2 space-y-2">
        <p className="flex md:justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Father Name:
          </span>
          <span className="ml-[72px] md:ml-0">{bioData.fatherName}</span>
        </p>
        <p className="flex md:justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Occupation:
          </span>
          <span className="ml-[86px] md:ml-0">{bioData.occupation}</span>
        </p>
        <p className="flex md:justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> age:
          </span>
          <span className="ml-[158px] md:ml-0">{bioData.age}</span>
        </p>
        <p className="flex md:justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Weight:
          </span>
          <span className="ml-32 md:ml-0">{bioData.weight}</span>
        </p>
        <p className="flex lg:justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Present address:
          </span>
          <span className="ml-12 md:ml-0">{bioData.presentDivision}</span>
        </p>
      
       
    
      </div>
    </div>
        </div> 
        <div>
        <div className="divider"></div>
        
        <div className="space-y-3 text-xl p-5 md:p-5 lg:ml-0">
        <p className="uppercase text-2xl my-3 "><strong>Expected Partner</strong> </p>
        <p className="flex  items-center gap-4">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Age:
          </span>
          <span>{bioData.partnerAge}</span>
        </p>
        <p className="flex  items-center gap-4">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Height:
          </span>
          <span>{bioData.partnerHeight}</span>
        </p>
        <p className="flex  items-center gap-4">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Weight:
          </span>
          <span>{bioData.partnerWeight}</span>
        </p>
        </div>
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

