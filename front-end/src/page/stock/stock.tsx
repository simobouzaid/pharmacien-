import { useEffect, useRef, useState, type ChangeEvent } from "react"
import BarreNavStock from "./barreNavStock"
import { api } from "../../api/api"
import { useNavigate } from "react-router-dom"
import type { produitType,produitResponse } from "../../type/type";
import IncrementBarre from "../../components/IcrementBarre";
import Nprogress from 'nprogress'
import "nprogress/nprogress.css";
import { EchecAlert, SuccessAlert } from "../../components/validateAlert";
  
export default function Stock() {

  document.title = 'stock'
  const nav = useNavigate();
  const [statusModifier, setStatusModifier] = useState<{ id: number, status: boolean }>({ id: 0, status: false })
  const [valider, setValider] = useState<boolean>(false);
  const [echec, setEchec] = useState<boolean>(false);
  const [produit, setProduit] = useState<produitType[]>([]);
  const [last_page, setLastPage] = useState<number>(1);
  const [numberOfpage, setNumberOfPage] = useState<number>(1);
  const numberOfStock = useRef<HTMLInputElement>(null)
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
  const handelSeach = async(e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.currentTarget.value).toLowerCase()
    if (value.length > 0) {

      // const response: produitType[] = produitSearch.filter((item) => {
      //   return item.name.toLowerCase().includes(value)
      // })
  await api.get(`/stockProduitsearch?name=${value}`,{headers:{
        Authorization:`bearer ${localStorage.getItem('token')}`
      }}).then((response)=>{
        console.log(response.data.produits)
        if (response.data.status) {
          
          const data : produitType[]= (response.data.produits).map((item:produitType)=>({
            name:item.name,
            prix:item.prix,
            form:item.form,
            presentation:item.presentation,   
            dosage:item.dosage,   
            id:item.id,   
            number:item.number
           ,idStock:item.idStock
            
          }))
          setProduit(data)
        }

      })
    }

  }

  useEffect(() => {
    const getProduitEnStock = async () => {
      Nprogress.start()
      const responsce = await api.get('/stock', {
        headers: {
          Authorization: `bearer ${localStorage.getItem('token')}`
        }
      }).catch((error) => {

        if (error.status === 401) {
          nav('/login')
        }
      })
      setLastPage(responsce?.data.produit.last_page)
      Nprogress.done()
      const data = responsce?.data.produit.data || []
      const produitNEw = data.map((item: produitResponse) => ({

        name: item.get_produit.name,
        presentation: item.get_produit.presentation,
        form: item.get_produit.form,
        dosage: item.get_produit.dosage,
        prix: item.get_produit.prix,
        id: item.get_produit.id,
        number: item.number,
        idStock: item.id
      }))


      setProduit(produitNEw)

    }
    getProduitEnStock()
  }, [nav, valider, echec])
  // modifier le nombre de stock de produit
  const updateProduit = async (idStock: number | undefined, produit_id: number | undefined) => {
    if (numberOfStock.current) {
      const number: number = Number(numberOfStock.current.value)
      if (number > 0) {
        console.log(idStock)
        Nprogress.start()
        await api.put(`/stock/${idStock}`, {
          produit_id: produit_id,
          number: number
        }, {
          headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`
          }
        }).then((response) => {
          if (response.data.status) {
            setValider(true)
            setTimeout(() => {
              setValider(false)
            }, 2000);
          } else {
            setEchec(true)
            setTimeout(() => {
              setEchec(false)
            }, 2000);
          }
        })
      } else {
        setEchec(true)
        setTimeout(() => {
          setEchec(false)
        }, 2000);
      }

    }
    Nprogress.done()
  }
  return (<>
    <h3 className="text-xl text-center font-black">les produit en stock</h3>
    {valider && <SuccessAlert msg="ajouter avec success" />}
    {echec && <EchecAlert msg="le nombre est vite" />}
    <BarreNavStock />
    <IncrementBarre increment={increment} decrement={decrement} rechercheProduit={handelSeach} numberOfpage={numberOfpage} lastPage={last_page} />

    <div className="grid md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-3 gap-4 mt-1 ">

      {
        produit.map((item, index) => (
          <div key={index + 1} className="border-amber-600 border-2 w-full flex flex-col items-center ml-1 mb-1 text-center bg-amber-300 hover:scale-125 transition duration-300 rounded-2xl">
            <h3 className="font-bold">{item.name}</h3>
            <h3>prix: {item.prix} dh</h3>
            <h3>form : {item.form}</h3>
            <h3>presentation : {item.presentation} </h3>
            <h3>dosage : {item.dosage} </h3>
            <h3>stock :{item.number} </h3>

            <div className="flex flex-col  md:flex-row md:space-x-2 ">
                  {/* modiffier le stock */}
            <button
              className="bg-blue-500 mb-1 px-4 text-white rounded-xl py-1 hover:bg-blue-400 transition duration-300"
              onClick={
                () => {
                  setStatusModifier({
                    id: item.id,
                    status: true
                  })
                }}>modiffier</button>
                {/* suprimmer un stock */}
            <button
              className="bg-red-500 mb-1 px-4 text-white rounded-xl py-1 hover:bg-red-400 transition duration-300"
              onClick={
                () => {
                  
                }}>suprimer</button>

                </div>

            {statusModifier.id === item.id &&
              <>
                <button className="bg-red-500 text-white px-2 hover:bg-red-400" onClick={() => { setStatusModifier({ id: 0, status: false }) }}>x</button>
                <input type="number" name="" id="" ref={numberOfStock} className="text-center mt-2 border h-8 mb-2 outline-none focus:ring-2 focus:ring-yellow-500 border-yellow-600 rounded-2xl shadow-2xl shadow-amber-700" placeholder="stock" />
                <button onClick={() => updateProduit(item.idStock, item.id)} className="bg-green-500 mb-1 px-5 text-white rounded-xl py-1 hover:bg-green-400 transition duration-300 ">appliquer </button>
              </>


            }
          </div>

        ))

      }
    </div>
  </>
  )
}
