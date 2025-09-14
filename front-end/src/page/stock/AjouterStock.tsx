import BarreNavStock from "./barreNavStock";
import { useEffect, useState, type ChangeEvent } from "react"
import { api } from "../../api/api"
import { useNavigate } from "react-router-dom"
import type { produitType } from "../../type/type";
import IncrementBarre from "../../components/IcrementBarre";
import Nprogress from 'nprogress'
import "nprogress/nprogress.css";
import { EchecAlert, SuccessAlert } from "../../components/validateAlert";



export default function AjouterStock() {
  document.title = 'stock'
  const token = localStorage.getItem('token')
  const nav = useNavigate()
  const [valider,setValider] = useState<boolean>(false);
  const [echec,setEchec] = useState<boolean>(false);
  const [produit, setProduit] = useState<produitType[]>([]);
  const [produitSearch, setProduitSeache] = useState<produitType[]>([]);
  const [last_page, setLastPage] = useState<number>(1);
const [numberOfStock,setNumberOfStock] = useState<number>(0);
  const [numberOfpage, setNumberOfPage] = useState<number>(1);
  if (!token) {
    nav('/login')
  }


  // handle le pagination
  const increment = () => {
    if (numberOfpage < last_page) {
      setNumberOfPage(numberOfpage + 1)
    }
  }
  const decrement = () => {
    if (numberOfpage > 1) {
      setNumberOfPage(numberOfpage - 1)
    }
  }
  //-----------------------------
  // le recherche a produit
  const handelSeach = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.currentTarget.value || '').toLowerCase()
    if (value.length === 0) {
      setProduit(produitSearch)
    } else {

      const response: produitType[] = produitSearch.filter((item) => {
        return item.name.toLowerCase().includes(value)
      })
      setProduit(response)

    }

  }


  // ajouter produit en stock 
  const handleChange :(e:ChangeEvent<HTMLInputElement>)=>void=(e)=>{
  setNumberOfStock(Number(e.currentTarget.value))
  }

const handleProduit =async(produitId:number)=>{

  if (numberOfStock > 0) {
    
    console.log(numberOfStock)
    await api.post('/stock',{
        number:numberOfStock
        ,produitId:produitId
      },{headers:{
          Authorization:`bearer ${localStorage.getItem('token')}`
        }}).then((response)=>{
            console.log(response.data)
            if (response.data.status) {
              
              setValider(true)
            setTimeout(() => {
              setValider(false)
              
            }, 2000);
            }else{
              alert('le produit deja en stock')
            }
          })
          
        }else{
          setEchec(true)
          setTimeout(() => {
            setEchec(false)
            
          }, 2000);
        }
      }


// -----------------------------------------------

  useEffect(() => {

    const getProduits = async () => {
      Nprogress.start()
      const response = await api.get(`/produit?page=${numberOfpage}`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })

      setLastPage(response.data.produits.last_page)
      Nprogress.done();

      const data: produitType[] = (response.data.produits.data).map((item: produitType) => ({
        id: item.id,
        prix: item.prix,
        name: item.name,
        form: item.form,
        presentation: item.presentation,
        dosage: item.dosage,
      }))
      setProduit(data)
      setProduitSeache(data)
    }
    getProduits()
  }, [token, numberOfpage])

  return (<>
    <h3 className="text-xl text-center font-black">les produit en stock</h3>

    {valider && <SuccessAlert msg="ajouter avec success"/>}
    {echec && <EchecAlert msg="le nombre est vite" />}
      <BarreNavStock />
    <IncrementBarre increment={increment} decrement={decrement} rechercheProduit={handelSeach} numberOfpage={numberOfpage} lastPage={last_page} />
    <div className="grid grid-cols-5 gap-4 mt-1 ">

      {

        produit.map((item) => (


          <div key={item.id} className="border-amber-600 border-2 w-full flex flex-col space-y-1 items-center ml-1 mb-1 text-center bg-amber-300 hover:scale-125 transition duration-300 rounded-2xl">
            <h3 className="font-bold">{item.name}</h3>
            <h3>form : {item.form}</h3>
            <h3>dosage :{item.dosage} </h3>
            <div   className="flex-grow">

              <h3>presentation : {item.presentation}</h3>
            </div>
            <h3>prix: {item.prix} dh</h3>




            <div className="  flex flex-col w-50 px-1 shadow shadow-amber-200 py-2">
              <input type="number" placeholder="le nombre de stock" onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)} className="w-full text-xl text-center   outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300" />
              <button className="bg-green-500 text-xl text-white rounded-full mt-2 " onClick={()=>handleProduit( item.id)}> ajouter</button>
            </div>

          </div>
        ))
      }

    </div>
  </>
  )
}

