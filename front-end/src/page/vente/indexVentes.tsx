import { useEffect, useState } from "react";
import BarNav from "./barNavVente";
import type { produitType } from "../../type/type";
import { api } from "../../api/api";
import { EchecAlert, SuccessAlert } from "../../components/validateAlert";
type typeVente = produitType & {
  created_at:Date,
  idVente?:number
};
function dateForm(date:Date):string{

   const d = new Date(date)
return d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear() +' | '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
}


const ShowVentes = () => {
  const[ ventes,setVentes] = useState<typeVente[]>([])
  const[ valider,setValider] = useState<boolean>(false)
  const[ echeck,setEcheck] = useState<boolean>(false)

const suprimmerVente =async (id:number | undefined)=>{
  if (id) {
     await api.delete(`/vente/${id}`,{headers:{Authorization:`bearer ${localStorage.getItem('token')}`}}).then((r)=>{if(r.data.status){
               setValider(true)
               setTimeout(() => {
                setValider(false)
               }, 1000);
     }}).catch(()=>{
       setEcheck(true)
               setTimeout(() => {
                setEcheck(false)
               }, 1000);
     })
  }
}

 useEffect(()=>{
   const getHistoriqueVente = async ()=>{
     await api.get('/indexHistorique',{headers:{Authorization:`bearer ${localStorage.getItem('token')}`}}).then((response)=>{
      setVentes(response.data.ventes.data)
     })
   }

   getHistoriqueVente()
 },[valider,echeck])


    return (<>
            <h3 className="text-2xl text-center font-extrabold">les ventes</h3>
            <BarNav />
              {valider && <SuccessAlert msg="success" />}
                {echeck && <EchecAlert msg="echeck" />}
        <div  className="flex flex-row  ">
           <table className="w-full border border-yellow-300 text-left">
  <thead>
    <tr className="bg-yellow-300">
      <th className="px-4 py-2 border-b border-yellow-400">Nom du produit</th>
      <th className="px-4 py-2 border-b border-yellow-400">Prix</th>
      <th className="px-4 py-2 border-b border-yellow-400">form</th>
      <th className="px-4 py-2 border-b border-yellow-400">presentation</th>
      <th className="px-4 py-2 border-b border-yellow-400">dosage</th>
      <th className="px-4 py-2 border-b border-yellow-400">Date de vente</th>
      <th className="px-4 py-2 border-b border-yellow-400">action</th>
    </tr>
  </thead>
  <tbody>
    {ventes.map((item)=>(

      <tr className="bg-yellow-100 hover:bg-yellow-200" key={item.idVente}>
      <td className="px-4 py-2 border-b border-yellow-300">{item.name} + {item.idVente}</td>
      <td className="px-4 py-2 border-b border-yellow-300">{item.prix} MAD</td>
      <td className="px-4 py-2 border-b border-yellow-300">{item.form}</td>
      <td className="px-4 py-2 border-b border-yellow-300">{item.presentation}</td>
      <td className="px-4 py-2 border-b border-yellow-300">{item.dosage}</td>
      <td className="px-4 py-2 border-b border-yellow-300">{dateForm(item.created_at)}</td>
      <td className="px-4 py-2 border-b border-yellow-300">
        <button  onClick={()=>suprimmerVente(item.idVente)}
        className="bg-red-500 px-2 py-1 text-white rounded-xl hover:bg-red-600 transition duration-300">suprimmer</button>
        </td>
    </tr>
    ))}
   
  </tbody>
</table>

        </div>
    </>
    );
};

export default ShowVentes;