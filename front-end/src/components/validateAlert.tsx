export  function SuccessAlert({msg}:propsType) {
    return (<>
        <div className="absolute animate-pulse  bg-green-500 w-50 h-7 text-xl  rounded-2xl shadow-lg shadow-amber-100 text-center text-amber-50 right-1 ">

           {msg}✅


        </div>

    </>)
}
export  function EchecAlert({msg} :propsType) {
    return (<>
        <div className="absolute animate-pulse  bg-red-500 w-50 h-7 text-xl  rounded-2xl shadow-lg shadow-amber-100 text-center text-amber-50 right-1 ">

              
      {msg}

        </div>

    </>)


}
type propsType ={msg:string}