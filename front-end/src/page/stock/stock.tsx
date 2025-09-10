import BarreNavStock from "./barreNavStock"



export default function Stock() {
  return (<>
  <h3 className="text-xl text-center font-black">les produit en stock</h3>
    <div className="grid grid-cols-5 gap-4 mt-1 ">

     <BarreNavStock />
      <div className="border-amber-600 border-2 w-full flex flex-col items-center ml-1 mb-1 bg-amber-300 hover:scale-125 transition duration-300 rounded-2xl">
        <h3>le nom :doliprne</h3>
        <h3>prix: 1223 dh</h3>
        <h3>form : dds</h3>
        <h3>presentation : </h3>
        <h3>dosage : </h3>
        <button className="bg-blue-500 mb-1 px-5 text-white rounded-xl py-1 hover:bg-blue-400 transition duration-300">modiffier</button>
      </div>
      
    </div>
  </>
  )
}
