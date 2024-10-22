import { useEffect, useState } from "react";

const BioDataPage = () => {
    const [bioData, setBioData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ageRange, setAgeRange] = useState({ min: '', max: '' });
    const [gender, setGender] = useState('');
    const [division, setDivision] = useState('');
    const [occupation, setOccupation] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Number of items to display per page

    useEffect(() => {
        fetch('http://localhost:5000/bioData')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setBioData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    // Filter biodata based on selected filters
    const filteredBiodata = bioData.filter(person => {
        const ageCondition = (ageRange.min ? person.age >= ageRange.min : true) &&
                            (ageRange.max ? person.age <= ageRange.max : true);
        
        const genderCondition = gender ? person.gender.toLowerCase() === gender : true;
        const divisionCondition = division ? person.division === division : true;
        const occupationCondition = occupation ? person.occupation === occupation : true;

        return ageCondition && genderCondition && divisionCondition && occupationCondition;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredBiodata.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBiodata = filteredBiodata.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const resetFilters = () => {
        setAgeRange({ min: '', max: '' });
        setGender('');
        setDivision('');
        setOccupation('');
        setCurrentPage(1);
    };

    return (
        <div className="flex">
            {/* Filter Options */}
           

            {/* Created Biodata */}
            <div className="w-3/4 p-4">
                <h2 className="text-xl mb-4">Created Biodata</h2>

                {filteredBiodata.length === 0 ? (
                    <div className="text-center">No data is available</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {currentBiodata.map(person => (
                                <div key={person._id} className="bg-base-100 shadow-2xl p-5">
                                    <img className="w-40 h-40 rounded-full" src={person.profileUrl} alt="Profile" />
                                    <div className="ml-5 text-gray-600 font-serif">
                                        <p><strong>Id:</strong> {person.id}</p>
                                        <p><strong>Type:</strong> {person.gender}</p>
                                        <p><strong>Division:</strong> {person.division}</p>
                                        <p><strong>Age:</strong> {person.age}</p>
                                        <p><strong>Occupation:</strong> {person.occupation}</p>
                                        <div className="mt-2">
                                            <button className="btn">View Profile</button>
                                        
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center gap-5 mt-5">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="w-1/4 p-4">
                <h2 className="text-xl mb-4">Filters</h2>

                {/* Filter by Age */}
                <div className="mb-6">
                    <label className="text-lg">Min Age:</label>
                    <input 
                        type="number" 
                        value={ageRange.min} 
                        onChange={(e) => setAgeRange({ ...ageRange, min: e.target.value })}
                        className="border p-1 mb-2 w-full"
                    />
                    <label className="text-lg">Max Age:</label>
                    <input 
                        type="number" 
                        value={ageRange.max} 
                        onChange={(e) => setAgeRange({ ...ageRange, max: e.target.value })}
                        className="border p-1 mb-4 w-full"
                    />
                </div>

                {/* Filter by Gender */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold">Biodata Type:</h3>
                    <label className="block">
                        <input 
                            type="radio" 
                            value="male" 
                            checked={gender === 'male'} 
                            onChange={(e) => setGender(e.target.value)} 
                        /> Male
                    </label>
                    <label className="block">
                        <input 
                            type="radio" 
                            value="female" 
                            checked={gender === 'female'} 
                            onChange={(e) => setGender(e.target.value)} 
                        /> Female
                    </label>
                </div>

                {/* Filter by Division */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold">Division:</h3>
                    {['Dhaka', 'Chattagram', 'Rangpur', 'Barisal', 'Khulna', 'Maymansingh', 'Sylhet'].map(div => (
                        <label key={div} className="block">
                            <input 
                                type="checkbox" 
                                value={div} 
                                checked={division === div} 
                                onChange={(e) => setDivision(e.target.checked ? div : '')}
                            /> {div}
                        </label>
                    ))}
                </div>

                {/* Filter by Occupation */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold">Occupation:</h3>
                    {['Engineer', 'Teacher', 'Doctor', 'Nurse', 'Architect', 'Artist', 'Scientist', 'Journalist', 'Businessman', 'Lawyer', 'Farmer', 'Researcher', 'Designer', 'Pilot', 'Pharmacist', 'Chef', 'Accountant'].map(occ => (
                        <label key={occ} className="block">
                            <input 
                                type="checkbox" 
                                value={occ} 
                                checked={occupation === occ} 
                                onChange={(e) => setOccupation(e.target.checked ? occ : '')}
                            /> {occ}
                        </label>
                    ))}
                </div>

                {/* Filter Buttons */}
                <button onClick={resetFilters} className="btn btn-secondary mt-4">Reset Filters</button>
            </div>
        </div>
    );
};

export default BioDataPage;