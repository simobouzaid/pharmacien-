import { Link } from "react-router-dom";

const BarNavVente = () => {
    
    return (
        <div className="flex flex-row justify-center    m-1">

            <Link to={'/vente'}
                className="text-2xl text-center rounded-full shadow-2xl  shadow-amber-300 hover:shadow-xl  transform hover:scale-110 transition duration-200  bg-amber-200 m-3 px-5 ">le vente des produits
            </Link>
            <Link to={'/showVentes'}
                className="text-2xl text-center rounded-full shadow-2xl  hover:shadow-xl  shadow-amber-300  transform hover:scale-110 transition duration-200 bg-amber-200 m-3 px-4 "> les ventes
            </Link>
            {/* <Link to={''}>vente </Link>
<Link to={''}>vente </Link>
<Link to={''}>vente </Link> */}


        </div>
    );
};

export default BarNavVente;