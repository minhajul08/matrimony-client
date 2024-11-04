import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useFavorite = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data: favorite = []} = useQuery ( {
        queryKey: ['favorite', user?.email],
        queryFn: async() => {
             const res = await axiosSecure.get (`/favorite?email=${user.email}`);
             return res.data;
        }
    })
    return[favorite]
};

export default useFavorite;