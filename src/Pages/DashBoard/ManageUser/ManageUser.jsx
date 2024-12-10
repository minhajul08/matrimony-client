import { MdAdminPanelSettings, MdWorkspacePremium } from "react-icons/md";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      console.log("Fetched users data:", res.data);
      return Array.isArray(res.data) ? res.data : []; 
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => console.error("Error updating admin status:", error));
  };

  const handleMakePremium = async (user) => {
    try {
      const res = await axiosSecure.patch(`/users/premium/${user._id}`);
      if (res.data.modifiedCount > 0) {
        await refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is a Premium Member Now!`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error("Error updating premium status:", error);
    }
  };

  if (isError) {
    return <div>Error fetching users: {error.message}</div>;
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl mb-5">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Make Premium</th>
            </tr>
          </thead>
          <tbody className="text-xl text-gray-600">
            {Array.isArray(users) &&
              users.map((u, index) => (
                <tr key={u._id}>
                  <th>{index + 1}</th>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    {u.role === 'admin' ? (
                      'Admin'
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(u)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-5xl"
                      >
                        <MdAdminPanelSettings />
                      </button>
                    )}
                  </td>
                  <td>
                    {u.premium === 'premium' ? (
                      'Premium Member'
                    ) : (
                      <button
                        onClick={() => handleMakePremium(u)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition text-5xl"
                      >
                        <MdWorkspacePremium />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageUser;