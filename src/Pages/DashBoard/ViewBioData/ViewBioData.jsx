import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { FiChevronRight } from 'react-icons/fi';
import { IoMdPhonePortrait } from 'react-icons/io';
import { AiOutlineMail } from 'react-icons/ai';
import { FaLocationDot } from 'react-icons/fa6';

const ViewBioData = () => {
    const [bioData, setBioData] = useState([]);
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    useEffect(() => {
        if (!email) return; // Prevent fetching data if email is not yet available

        const fetchBioData = async () => {
            try {
                const response = await axiosSecure.get(`/bioData/${email}`);
                setBioData(response.data);
            } catch (err) {
                setError('Error fetching biodata. Please try again.');
                console.error('Error fetching biodata:', err);
            }
        };

        fetchBioData();
    }, [axiosSecure, email]); // Include `email` as a dependency

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h1 className='text-2xl font-serif p-5'>Total Biodata: {bioData.length}</h1>
                   
                      <div className="grid grid-cols-1 gap-5 mx-10 my-5">
                      {bioData.map((data, index) => (
                            <div className="  card bg-base-100  shadow-xl">
                            <figure>
                              <img 
                              className='h-[450px] w-full'
                                src={data.image}
                                alt="Shoes" />
                            </figure>
                            <div className="card-body">
                            <p className="uppercase text-2xl"><strong>Personal info</strong> </p>
                              <div className="flex flex-col md:flex-row md:justify-between font-sans text-[#4a3d3d] gap-10 text-xl">
   
      <div className="w-full md:w-1/2 space-y-2 mb-4 md:mb-0">
    
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Name:
          </span>
          <span>{data.name}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Mother's name:
          </span>
          <span>{data.motherName}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Date of birth:
          </span>
          <span>{data.date}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Height:
          </span>
          <span>{data.height}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Permanent address:
          </span>
          <span>{data.permanentDivision}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Race:
          </span>
          <span>{data.race}</span>
        </p>
       
      </div>
      
      <div className="w-full md:w-1/2 space-y-2">
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Father Name:
          </span>
          <span>{data.fatherName}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Occupation:
          </span>
          <span>{data.occupation}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> age:
          </span>
          <span>{data.age}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Weight:
          </span>
          <span>{data.weight}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Present address:
          </span>
          <span>{data.presentDivision}</span>
        </p>
      
       
    
      </div>
    </div>
    <div className="divider"></div>
       
       <div className='flex lg:gap-20'>
       <div className="space-y-5 text-2xl">
       <p className="uppercase"><strong>Contract info</strong> </p>
      
       <p className="flex items-center  gap-2"><IoMdPhonePortrait className="border border-gray-500 rounded-lg text-3xl p-1 " /> <span>Phone:</span> {data.mobile} </p>
       <p className="flex items-center gap-2"><AiOutlineMail className="border border-gray-500 rounded-lg text-3xl p-1 " /> <span>Email:</span> {data.email} </p>
       <p className="flex items-center gap-2"><FaLocationDot className="border border-gray-500 rounded-lg text-3xl p-1 " /> <span>Address:</span> {data.permanentDivision} </p>
       </div>
       
        <div className="space-y-3 text-xl">
        <p className="uppercase text-2xl "><strong>Expected Partner</strong> </p>
        <p className="flex  items-center gap-4">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Age:
          </span>
          <span>{data.partnerAge}</span>
        </p>
        <p className="flex  items-center gap-4">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Height:
          </span>
          <span>{data.partnerHeight}</span>
        </p>
        <p className="flex  items-center gap-4">
          <span className="flex items-center font-semibold">
            <FiChevronRight className="mr-2" /> Weight:
          </span>
          <span>{data.partnerWeight}</span>
        </p>
        </div>
       </div>
     
                            </div>
                            
                          </div>
                        ))}
                      </div>
                    
                </div>
            )}
        </div>
    );
};

export default ViewBioData;
