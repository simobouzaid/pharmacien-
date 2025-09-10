

import { Link } from 'react-router-dom';
export default function BarreNavStock() {
    return (<>


        <div className="flex flex-col justify-center  w-full  mr-2 h-full">

            <Link to={''}
                className="text-2xl text-center rounded-full shadow-2xl  shadow-amber-300 hover:shadow-xl  transform hover:scale-110 transition duration-200 bg-amber-200 m-3 px-2 ">les produits
                en stock            </Link>
            <Link to={'/showVentes'}
                className="text-2xl text-center rounded-full shadow-2xl  hover:shadow-xl  shadow-amber-300  transform hover:scale-110 transition duration-200 bg-amber-200 m-3 ">
                ajouter produit en stock
            </Link>


        </div>



    </>);
}