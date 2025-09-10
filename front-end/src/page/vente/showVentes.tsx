import BarNav from "./barNavVente";

const ShowVentes = () => {
    return (<>
            <h3 className="text-2xl text-center font-extrabold">les ventes</h3>
        <div  className="flex flex-row  ">
            <BarNav />
           <table className="w-full border border-yellow-300 text-left">
  <thead>
    <tr className="bg-yellow-300">
      <th className="px-4 py-2 border-b border-yellow-400">Nom du produit</th>
      <th className="px-4 py-2 border-b border-yellow-400">Prix</th>
      <th className="px-4 py-2 border-b border-yellow-400">form</th>
      <th className="px-4 py-2 border-b border-yellow-400">presentation</th>
      <th className="px-4 py-2 border-b border-yellow-400">dosage</th>
      <th className="px-4 py-2 border-b border-yellow-400">Date de vente</th>
      <th className="px-4 py-2 border-b border-yellow-400">Date de vente</th>
    </tr>
  </thead>
  <tbody>
    <tr className="bg-yellow-100 hover:bg-yellow-200">
      <td className="px-4 py-2 border-b border-yellow-300">Simo</td>
      <td className="px-4 py-2 border-b border-yellow-300">100 MAD</td>
      <td className="px-4 py-2 border-b border-yellow-300">07-09-2025</td>
      <td className="px-4 py-2 border-b border-yellow-300">07-09-2025</td>
      <td className="px-4 py-2 border-b border-yellow-300">07-09-2025</td>
      <td className="px-4 py-2 border-b border-yellow-300">07-09-2025</td>
      <td className="px-4 py-2 border-b border-yellow-300"><button className="bg-red-500 px-2 py-1 text-white rounded-xl hover:bg-red-600 transition duration-300">suprimmer</button></td>
    </tr>
   
  </tbody>
</table>

        </div>
    </>
    );
};

export default ShowVentes;