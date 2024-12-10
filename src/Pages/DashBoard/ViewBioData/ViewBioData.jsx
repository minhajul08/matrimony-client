import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { IoMdPhonePortrait } from 'react-icons/io';
import { HiOutlineMail } from "react-icons/hi";
import { FaLocationDot } from 'react-icons/fa6';

const ViewBioData = () => {
    const [bioData, setBioData] = useState([]);
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    useEffect(() => {
        if (!email) return; 

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
          <h1 className="text-lg md:text-xl lg:text-2xl font-serif p-3 md:p-4 lg:p-5">
            Total Biodata: {bioData.length}
          </h1>
    
          <div className="grid grid-cols-1  gap-5 mx-2 md:mx-5 lg:mx-10 my-5">
            {bioData.map(data => (
              <div key={data._id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    className="h-48 sm:h-64 lg:h-96 w-full object-cover"
                    src={data.image}
                    alt="Profile"
                  />
                </figure>
                <div className="card-body">
                  <p className="uppercase text-lg md:text-xl lg:text-2xl">
                    <strong>Personal info</strong>
                  </p>
                  <div className="flex flex-col md:flex-row md:justify-between text-sm sm:text-base lg:text-lg text-[#4a3d3d] gap-5">
                    <div className="w-full md:w-1/2 space-y-2">
                      <p className="flex justify-between">
                        <span className="font-semibold">Name:</span>
                        <span>{data.name}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Mother's name:</span>
                        <span>{data.motherName}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Date of birth:</span>
                        <span>{data.date}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Height:</span>
                        <span>{data.height}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Permanent address:</span>
                        <span>{data.permanentDivision}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Race:</span>
                        <span>{data.race}</span>
                      </p>
                    </div>
    
                    <div className="w-full md:w-1/2 space-y-2">
                      <p className="flex justify-between">
                        <span className="font-semibold">Father's name:</span>
                        <span>{data.fatherName}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Occupation:</span>
                        <span>{data.occupation}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Age:</span>
                        <span>{data.age}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Weight:</span>
                        <span>{data.weight}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-semibold">Present address:</span>
                        <span>{data.presentDivision}</span>
                      </p>
                    </div>
                  </div>
    
                  <div className="divider"></div>
    
                  <div className="flex flex-col lg:flex-row lg:gap-10">
                    <div className="space-y-5">
                      <p className="uppercase text-lg lg:text-xl">
                        <strong>Contact Info</strong>
                      </p>
                      <p className="flex items-center gap-2">
                        <IoMdPhonePortrait className="text-lg sm:text-2xl lg:text-3xl" />
                        <span>Phone:</span> {data.mobile}
                      </p>
                      <p className="flex items-center gap-2">
                        <HiOutlineMail  className="text-lg sm:text-2xl lg:text-3xl" />
                        <span>Email:</span> {data.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaLocationDot className="text-lg sm:text-2xl lg:text-3xl" />
                        <span>Address:</span> {data.permanentDivision}
                      </p>
                    </div>
    
                    <div className="space-y-3">
                      <p className="uppercase text-lg lg:text-xl">
                        <strong>Expected Partner</strong>
                      </p>
                      <p className="flex gap-2">
                        <span className="font-semibold">Age:</span>
                        <span>{data.partnerAge}</span>
                      </p>
                      <p className="flex gap-2">
                        <span className="font-semibold">Height:</span>
                        <span>{data.partnerHeight}</span>
                      </p>
                      <p className="flex gap-2">
                        <span className="font-semibold">Weight:</span>
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
