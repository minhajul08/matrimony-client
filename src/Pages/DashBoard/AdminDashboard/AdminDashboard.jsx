import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();


  const { data: users = {}, refetch, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    },
  });


  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-500">Error: {error.message}</div>;
  }

  const { totalBiodata, premiumCount, genderStats } = users;

  if (!genderStats || !Array.isArray(genderStats) || genderStats.length === 0) {
    return <div className="text-center mt-5 text-red-500">Gender Stats are unavailable.</div>;
  }

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, Back</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Total Biodata */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Biodata</h3>
          <p className="text-2xl text-gray-900">{totalBiodata}</p>
        </div>

        {/* Premium Users */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Premium Users</h3>
          <p className="text-2xl text-gray-900">{premiumCount}</p>
        </div>

        {/* Gender Stats */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Gender Stats</h3>
          <div className="space-y-2">
            {genderStats.map((item, index) => (
              <div key={index} className="flex justify-between text-gray-600">
                <span>{item._id}</span>
                <span>{item.count}</span> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
