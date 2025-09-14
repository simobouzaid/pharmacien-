import type { ChangeEvent } from "react"

type rechercheType =(e:ChangeEvent<HTMLInputElement>)=>void
type incrementType =()=>void
type decrementType =()=>void
interface Alltype{
   rechercheProduit: rechercheType,
   increment: incrementType,
   decrement: decrementType
   numberOfpage:number
   lastPage:number
}

export default function IncrementBarre( {rechercheProduit,increment,decrement ,numberOfpage,lastPage}:Alltype){
    return (<>
    
    <div className="flex flex-row space-x-5  justify-center h-13 w-full bg-yellow-400">


          <h3>page:{numberOfpage} | {lastPage}</h3>
         <button onClick={decrement} className="bg-amber-800 mt-2 mb-2 text-xl px-2  text-white rounded-full hover:bg-amber-700 transition duration-300 shadow-2xl  ">decrement(-)</button>
         <button onClick={increment} className="bg-amber-800 mt-2 mb-2 text-xl px-2 text-white rounded-full hover:bg-amber-700 transition duration-300  shadow-2xl ">increment(+)</button>
         <input type="search" onChange={(e:ChangeEvent<HTMLInputElement>)=>rechercheProduit(e)}  className="text-center mt-2 border h-8 outline-none focus:ring-2 focus:ring-yellow-500 border-yellow-600 rounded-2xl shadow-2xl shadow-amber-700" placeholder="recherche" />


    </div>
    
    
    </>)
}