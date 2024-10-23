import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";


const BioData = () => {
    const {user} = useContext (AuthContext)
    return (
        <div>
           <h2 className="text-3xl">BioData {user?.email} </h2>
        </div>
    );
};

export default BioData;