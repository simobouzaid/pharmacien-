import { useEffect } from "react";
import BarNav from "./barNavVente";

const Vente = () => {
  useEffect(()=>{
    document.title='vente'

  })
    return (<>
        <h3 className="text-2xl text-center font-extrabold"> Ventes de produits </h3>
        <div className="flex flex-row w-full mb-3">
            <BarNav />
             {/* partie de vente */}
            <div className="border-5 border-amber-300 w-1/2">
                     <h3 className="text-center text-2xl  bg-amber-300 font-bold">ventes</h3>
                     <button className="bg-green-500  px-9 m-1 text-white text-xl hover:bg-green-600 rounded-full transition duration-200 ml-50">valider le vente</button>
                       <div className="grid grid-cols-4 gap-4 mt-1 ">

                        <div className=" bg-amber-200 hover:bg-amber-300 flex  flex-col items-center justify-around  border-2 mb-2 ml-2 border-amber-300  shadow-2xl hover:shadow-xl transform hover:scale-120 transition duration-200">
                                <h3> dolipran</h3>
                                <h3> prix :12dh</h3>
                                <h3>presentation</h3>
                                <h3>dosage</h3>
                                <h3>form</h3>
                                 <button className="bg-red-500 py-1 px-4 m-1 text-white w-full  hover:bg-red-600 rounded-full transition duration-200">suprimmer</button>

                        </div>


                      </div>

            </div>

            {/* partie de produit  */}
            <div className=" border-5 border-amber-300  w-1/2">
                <h3 className="text-center text-2xl bg-amber-300 font-bold" >produits</h3>
                <input type="text" placeholder="recherche" className="w-full  text-center text-2xl  text-yellow-900 border-yellow-300  rounded-lg border-3 px-3 py-2  outline-none focus:ring-2 focus:ring-yellow-500 m-2  transition duration-200"   />
                      <div className="grid grid-cols-4 gap-4  ">

                        <div className=" bg-amber-200 hover:bg-amber-300 flex  flex-col items-center justify-around  border-2 mb-2 ml-2 border-amber-300  shadow-2xl hover:shadow-xl transform hover:scale-120 transition duration-200">
                                <h3> dolipran</h3>
                                <h3> prix :12dh</h3>
                                <h3>presentation</h3>
                                <h3>dosage</h3>
                                <h3>form</h3>
                                 <button className="bg-green-500  w-full  m-1 text-white text-xl hover:bg-green-600 rounded-full transition duration-200">vente</button>

                        </div>


                      </div>
            </div>
           
        </div>
    </>
    );
};

export default Vente;