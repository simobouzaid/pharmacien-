
import { Link } from 'react-router-dom';
const BarreNavigation = () => {
    return (
        <div className='flex flex-row justify-around bg-amber-300 shadow-amber-300 '>

            <Link to={"/"}  className='text-2xl  transform hover:scale-130 transition duration-200 py-2 tracking-tight font-[Open_Sans]' >home</Link>
            <Link to={"/vente"}  className='text-2xl  transform hover:scale-130 transition duration-200 py-2 font-[Open_Sans]' >vente</Link>
            <Link to={"/produit"} className='text-2xl  transform hover:scale-130 transition duration-200 py-2 font-[Open_Sans]' >produit</Link>
            <Link to={"/stock"} className='text-2xl  transform hover:scale-130 transition duration-200 py-2 font-[Open_Sans]' >stock</Link>


        </div>
    );
};

export default BarreNavigation;