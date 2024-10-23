import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using react-router-dom

const BioDataDetailsPage = () => {
  const { id } = useParams(); // Get the 'id' from the route params
  const [bioData, setBioData] = useState(null); // Initialize bioData as null
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bioDataDetails/${id}`);
        const data = await response.json();
        setBioData(data); // Set the fetched data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching biodata:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Dependency is 'id' to avoid infinite re-fetching

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      {bioData ? (
        <div className="mt-20">
          <h1>{bioData.name}</h1>
          {/* Display other bioData details as needed */}
          <p>Age: {bioData.age}</p>
          <h2 className="text-lg font-semibold">Details</h2>
         <p><strong>Height:</strong> {bioData.height}</p>
         <p><strong>Religion:</strong> {bioData.religion}</p>
         <p><strong>Caste:</strong> {bioData.caste}</p>
         <p><strong>Education:</strong> {bioData.education}</p>
         <p><strong>Occupation:</strong> {bioData.occupation}</p>
          <p>Gender: {bioData.gender}</p>
          {/* Add more fields as per your biodata schema */}
        </div>
         
      ) : (
        <div>No biodata found.</div>
      )}
    </div>
  );
};

export default BioDataDetailsPage;

