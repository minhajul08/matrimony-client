import { useEffect, useState } from "react";


const CardSection = () => {

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/premiumMember')
      .then(res => res.json())
      .then(data => {
        setMenu(data)
      })
  }, [])



  return (
    <div>
      <h1 className="text-3xl text-center">Exclusive Premium Members</h1>
      <div className="flex justify-end">
      <select className="select select-bordered w-full max-w-52 ">
        <option selected>ascending</option>
        <option>descending</option>
      </select>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {
          menu.map(premium => <div key={premium._id} className="card bg-base-100  shadow-xl my-3">

            <div className="flex justify-between mx-3 p-5">
              <div>
                <img
                  className="w-40 h-40"
                  src={premium.image}
                  alt="Shoes" />
              </div>
              <div className="ml-5">
                <p>Id: {premium.id}</p>
                <p>Type: {premium.type}</p>
                <p>Division: {premium.division}</p>
                <p>Age: {premium.age}</p>
                <p> Occupation: {premium.occupation}</p>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default CardSection;