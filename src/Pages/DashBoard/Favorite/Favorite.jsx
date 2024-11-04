// Favorite.js
import useFavorite from "../../../hooks/useFavorite";

const Favorite = () => {
    const [favorite] = useFavorite([]); 
    console.log (favorite)

    return (
        <div className="mx-10 space-y-6 mt-5">
            <h1 className="text-3xl ">Favorite {favorite.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>BioData Id</th>
                            <th>Name</th>
                            <th>Occupation</th>
                            <th>Permanent Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorite.map(list => (
                            <tr key={list._id}>
                                <th>{list.id}</th>
                                <td>{list.name }</td>
                                <td>{list.occupation}</td>
                                <td>{list.permanentAddress}</td>
                                <td>
                                    <button className="btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Favorite;
