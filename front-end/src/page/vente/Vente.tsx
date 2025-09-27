import { useEffect, useState, type ChangeEvent } from "react";
import BarNav from "./barNavVente";
import { api } from "../../api/api";
import IncrementBarre from "../../components/IcrementBarre";
import type { produitResponse, produitType } from "../../type/type";
import { EchecAlert, SuccessAlert } from "../../components/validateAlert";
import { useLocation, useNavigate } from "react-router-dom";

const Vente = () => {
  document.title = "vente"
  const [produit, setProduit] = useState<produitType[]>([]);
  const [produitSearch, setProduitSeache] = useState<produitType[]>([]);
  const [last_page, setLastPage] = useState<number>(1);
  const [numberOfpage, setNumberOfPage] = useState<number>(1);
  const [ventes, setVentes] = useState<produitType[]>([])
  const [msg,setMsg] = useState<string>('');
  const [valider, setValider] = useState<boolean>();
  const [echeck, setEcheck] = useState<boolean>();
  const nav = useNavigate()

  const local =useLocation()
  console.log(local.pathname)
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
  const handelSeach =async (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.currentTarget.value || '').toLowerCase()
    if (value.length === 0) {
      setProduit(produitSearch)
    } else {

        await api.get('/venteProduitsearch?name='+value,{headers:{
          Authorization:`bearer ${localStorage.getItem('token')}`
        }}).then((response)=>{
          console.log(response.data.produits)
                setProduit(response.data.produits)

        })


      // const response: produitType[] = produitSearch.filter((item) => {
      //   return item.name.toLowerCase().includes(value)
      // })
      // setProduit(response)
      
    }

  }

  // vente des produits 
  const handleVente = async (produit_id: number) => {

    if (produit_id !== 0) {

      await api.post('/vente', {
        produit_id: produit_id
      }, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('token')}`
        }
      }
      ).then((response) => {
        if (response.data.status) {
          console.log(response.data)
          setValider(true)
          setMsg('le vente avec success')
          setTimeout(() => {
            setValider(false)
          }, 1000);
        } else {
          setEcheck(true)
          setMsg('error')
          setTimeout(() => {
            setEcheck(false)
          }, 1000);
        }
      }).catch((Error) => {
        if (Error.status === 401) {
          nav('/login')
        }
        setEcheck(true)
        setMsg('error')
        setTimeout(() => {
          setEcheck(false)
        }, 1000);

      })

    }
  }


  ///-----------****************

  // recuperer les produits pour vente
  useEffect(() => {
    const indexProduitVente = async () => {
      await api.get('/indexProduitVente?page=' + numberOfpage, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('token')}`
        }
      }).then((reponse) => {
        setLastPage(reponse.data.produit.last_page)
        const data: produitType[] = (reponse.data.produit.data).map((item: produitResponse) => ({
          id: item.get_produit.id,
          name: item.get_produit.name,
          dosage: item.get_produit.dosage,
          presentation: item.get_produit.presentation,
          form: item.get_produit.form,
          prix: item.get_produit.prix,



        }))
        setProduit(data)
        setProduitSeache(data)
      })
    }
    indexProduitVente()
  }, [numberOfpage, valider, echeck])
  //**************************************** */
  // recuperer les produits on vente

  useEffect(() => {
    const getProduitsVent = async () => {
      await api.get('/vente', {
        headers: {
          Authorization: `bearer ${localStorage.getItem('token')}`
        }
      }).then((rs) => {
        setVentes(rs.data.ventes)
      })
    }



    getProduitsVent()
  }, [echeck, valider])


  //*************************************** */
  // valider les vente 
  const validerVente = async () => {
    await api.get('/updateVente', {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      console.log(response.data)
      if (response.data.status) {
        setValider(true)
        setMsg(' les produits valider ')
        setTimeout(() => {
          setValider(false)
        }, 1000);
      } else {
        
        setEcheck(true)
        setMsg('error ')
        setTimeout(() => {
          setEcheck(false)
        }, 1000);

      }
    }).catch((Error) => {
      if (Error.status === 401) {
        nav('/login')
      }
      setEcheck(true)
      setTimeout(() => {
        setEcheck(false)
      }, 1000);

    })
  }
//---------*****----------*****
// suprimmer les ventes

const suprimmerVente =async()=>{
    await api.delete('/venteNotValide',{
      headers:{
        Authorization:`bearer ${localStorage.getItem('token')}`
      }
    }).then((r)=>{
      console.log(r.data)
       setValider(true)

       setMsg('suprimmer avec success')
       setTimeout(() => {
         
         setValider(false)
        }, 1000);
      }).catch((e)=>{
        setEcheck(true)
        setMsg('error de suprimmer')
      setTimeout(() => {
        setEcheck(false)
      }, 1000);

      console.log(e)
    });
}
//*-**--*-*-**-*-*-***************

  return (<>
    <h3 className="text-2xl text-center font-extrabold"> Ventes de produits </h3>

    <BarNav />
    <IncrementBarre decrement={decrement} increment={increment} lastPage={last_page} numberOfpage={numberOfpage} rechercheProduit={handelSeach} />
    {valider && <SuccessAlert msg={msg} />}
    {echeck && <EchecAlert msg={msg} />}
    <div className="flex flex-row w-full mb-3 mt-2">
      {/* partie de vente */}
      <div className="border-5 border-amber-300 w-1/2">
        <h3 className="text-center text-2xl  bg-amber-300 font-bold">ventes</h3>
        { ventes.length !==0 &&

          <div>

        <button className="bg-green-500  px-9 m-1 text-white text-xl hover:bg-green-600 rounded-full transition duration-200 ml-50" onClick={validerVente}>valider le vente</button>
        <button className="bg-red-500 py-1 px-4 m-1 text-white text-xl  hover:bg-red-600 rounded-full transition duration-200" onClick={suprimmerVente}>suprimmer la commands</button>
        </div>
        }

        <div className="grid grid-cols-4 gap-4 mt-1 ">
          {
            ventes.map((item) => (

              <div className=" animate-fade-up  bg-amber-200 hover:bg-amber-300 flex mr-2 flex-col items-center  text-center justify-around  border-2 mb-2 ml-2 border-amber-300  shadow-2xl hover:shadow-xl transform hover:scale-120 transition duration-200">
                <h3 className="font-bold text-center"> {item.name}</h3>
                <h3> prix :{item.prix}dh</h3>
                <h3>{item.presentation}</h3>
                <h3>dosage : {item.dosage}</h3>
                <h3>form : {item.form}</h3>
                <h3>total:{item.number}</h3>

              </div>
            ))
          }


        </div>

      </div>

      {/* partie de produit  */}
      <div className=" border-5 border-amber-300  w-1/2">
        <h3 className="text-center text-2xl bg-amber-300 font-bold" >produits</h3>
        <div className="grid md:grid-cols-4 sm:grid-cols-2  grid-cols-1 md:gap-4 gap-2 my-2 ">
          {
            produit.map((item) => (

              <div className=" bg-amber-200 hover:bg-amber-300 flex  flex-col items-center justify-around  border-2 mb-2 ml-2 border-amber-300  shadow-2xl hover:shadow-xl transform hover:scale-120 transition duration-200">
                <h3 className="font-bold"> {item.name}</h3>
                <h3> prix :{item.prix} dh</h3>
                <h3>{item.presentation}</h3>
                <h3>dosage:{item.dosage}</h3>
                <h3>{item.form}</h3>
                <button className="bg-green-500  w-full  m-1 text-white text-xl hover:bg-green-600 rounded-full transition duration-200" onClick={() => handleVente(item.id)}>vente</button>

              </div>
            ))
          }


        </div>
      </div>

    </div>
  </>
  );
};

export default Vente;