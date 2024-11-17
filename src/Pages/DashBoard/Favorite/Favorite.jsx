// Favorite.js
import { FaTrashAlt } from "react-icons/fa";
import useFavorite from "../../../hooks/useFavorite";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Favorite = () => {
    const [favorite,refetch] = useFavorite([]);
    const axiosSecure = useAxiosSecure();
    const handelDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/favorite/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch ()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="mx-10 space-y-6 mt-5">
            <h1 className="text-3xl ">Favorite {favorite.length}</h1>
            <div className="overflow-x-auto ">
                <table className="table table-zebra">
                    <thead>
                        <tr className="text-2xl">
                            <th>BioData Id</th>
                            <th>Name</th>
                            <th>Occupation</th>
                            <th>Permanent Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorite.map(list => (
                            <tr className="text-xl" key={list._id}>
                                <th>{list.id}</th>
                                <td>{list.name}</td>
                                <td>{list.occupation}</td>
                                <td>{list.permanentAddress}</td>
                                <td>
                                    <button
                                        onClick={() => handelDelete(list._id)}
                                        className="btn bg-[#B91C1C] btn-md text-white text-2xl">
                                        <FaTrashAlt></FaTrashAlt>
                                    </button>
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
