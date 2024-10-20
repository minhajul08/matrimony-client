import { useEffect, useState } from "react";

const CardSection = () => {
  const [menu, setMenu] = useState([]);
  const [sortOrder, setSortOrder] = useState("ascending");

  useEffect(() => {
    fetch('http://localhost:5000/premiumMember')
      .then(res => res.json())
      .then(data => {
        setMenu(data);
      })
  }, []);

  // Function to handle sorting
  const handleSort = (order) => {
    const sortedMenu = [...menu].sort((a, b) => {
      if (order === "ascending") {
        return a.age - b.age;
      } else {
        return b.age - a.age; 
      }
    });
    setMenu(sortedMenu);
  };

  const handleChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    handleSort(order);
  };

  return (
    <div>
      <h1 className="text-3xl text-center">Exclusive Premium Members</h1>
      <div className="flex justify-end">
        <select
          className="select select-bordered w-full max-w-52"
          value={sortOrder}
          onChange={handleChange}
        >
          <option value="ascending">Lower</option>
          <option value="descending">Higher</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-5 my-5">
        {menu.map((premium) => (
          <div key={premium._id} className=" bg-base-100 shadow-2xl ">
            <div className="flex justify-between mx-3 p-5">
              <div>
                <img className="w-40 h-40" src={premium.image} alt="Profile" />
              </div>
              <div className="ml-5 text-gray-600 font-serif">
                <p>Id: {premium.id}</p>
                <p>Type: {premium.type}</p>
                <p>Division:<span className="ml-1">{premium.division}</span></p>
                <p>Age: {premium.age}</p>
                <p>Occupation: {premium.occupation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;
