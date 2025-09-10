import type React from "react"
import { useEffect, useState } from "react"
import { api } from "../api/api";


type handelchange=(e:React.ChangeEvent<HTMLInputElement>)=>void


export default function Home() {
    document.title = 'home'
  const [lentg,setLentgh] =useState<number>(0);
  const [value,setValue] =useState<string>('');
const handleChange:handelchange =(e)=>{
setLentgh((e.currentTarget.value).length)
    setValue(e.currentTarget.value)
}


useEffect(()=>{
    const getdata=async () =>{

        const res= await api.get('/api')
        console.log(res.data)
    }
    getdata()
},[])
 
    return <>

        <div className="grid grid-cols-3 gap-2">
            <h3>
            {lentg  }
                          and {value}
            </h3>
            <div className="bg-amber-200  w-full m-2">
            <input type="text" name="" onChange={(e)=>handleChange(e)} id="" />



            </div>

            <div className="bg-amber-700 m-2">
                 

                <h3></h3>
            </div>
            <div className="bg-amber-700 m-2">


                <h3></h3>
            </div>







        </div>




    </>
}