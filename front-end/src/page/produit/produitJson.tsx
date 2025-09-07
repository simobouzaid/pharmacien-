import { useEffect, useRef, useState } from 'react';
import Json from './produit.json';

type produitType = {
    nom: string,
    dosage1: string | null,
    forme: string,
    uniteDosage1: string,
    ppv: number,
    presentation: string

}
type stockType = {
    nom: string,
    dosage1: string | null,
    forme: string,
    uniteDosage1: string,
    ppv: number,
    presentation: string,
    stock: number

}
function ProduitJson() {

    const recherche = useRef<HTMLInputElement | null>(null)
    const [produit, setProduit] = useState<produitType[]>([]);
    const [produitAll, setProduitAll] = useState<produitType[]>([]);
    const [increment2, set2Increment] = useState<number>(30);
    const [increment1, set1Increment] = useState<number>(0);
    const [numberOfPage, setNumberOfPage] = useState<number>(1)
    const decrement = () => {
        if (increment1 >= 0) {
            set1Increment(increment1 - 30)
            set2Increment(increment2 - 30)
            setNumberOfPage(numberOfPage - 1)
        }
    }
    const increment = () => {
        if (increment2 <= Json.length) {

            set1Increment(increment1 + 30)
            set2Increment(increment2 + 30)
            setNumberOfPage(numberOfPage + 1)

        }
    }

const rechercheProduit =()=>{
    const value:string |null =recherche.current?.value?.toLowerCase() ?? null;
    if (recherche.current?.value.length === 0) {
        setProduit(produitAll.slice(increment1,increment2))
        console.log(recherche.current?.value)
    }else{
        
       const data = produitAll.filter((item)=>{ 
           return item.nom.toLowerCase().includes(value ?? "")
    }) 
    setProduit(data)
        
    }


}




    const ajouterStock = (data: stockType) => {
        console.log(data)
    }
    useEffect(() => {
        document.title = ' les produits'
        const data: produitType[] = Json.map((item) => ({
            nom: item.nom,
            dosage1: item.dosage1,
            uniteDosage1: item.uniteDosage1,
            ppv: item.ppv,
            forme: item.forme,
            presentation: item.presentation,
        }))
        setProduitAll(data);
        setProduit(data.slice(increment1, increment2))
    }, [increment1, increment2])
    return (
        <div>
            <h3 className='text-2xl text-center font-black'>les produits</h3>
            <div className='flex '>

                <div className='flex items-center justify-center mx-2 py-1'>
                    <h4>page: {numberOfPage} / {parseInt(`${((Json.length / 30) + 1)}`)}</h4>
                    <button onClick={decrement}
                        className='px-20 m-2 bg-amber-500 text-xl text-white  rounded-2xl  hover:bg-amber-400 transition duration-300'>decrement</button>
                    <button onClick={increment}
                        className='px-20 m-2 bg-amber-500 text-xl text-white   rounded-2xl  hover:bg-amber-400 transition duration-300'>increment</button>

                </div>
                {/* inpute pour le recherche */}
                <input type="text" placeholder='recherche' onChange={rechercheProduit} ref={recherche}
                    className='text-center border-2  px-6 mb-3 mt-1 border-amber-400 outline-none   focus:ring-2 focus:ring-yellow-400 ' />
            </div>

            <table className="w-full border border-yellow-300 text-left">
                <thead>
                    <tr className="bg-yellow-300">
                        <th className="px-4 py-2 border-b border-yellow-400">Nom du produit</th>
                        <th className="px-4 py-2 border-b border-yellow-400">Prix</th>
                        <th className="px-4 py-2 border-b border-yellow-400">form</th>
                        <th className="px-4 py-2 border-b border-yellow-400">presentation</th>
                        <th className="px-4 py-2 border-b border-yellow-400">dosage</th>
                        <th className="px-4 py-2 border-b border-yellow-400">action</th>
                    </tr>
                </thead>
                <tbody>

                    {produit.map((item) => (

                        <tr className="bg-yellow-100 hover:bg-yellow-200">
                            <td className="px-4 py-2 border-b border-yellow-300">{item.nom}</td>
                            <td className="px-4 py-2 border-b border-yellow-300">{item.ppv} dh</td>
                            <td className="px-4 py-2 border-b border-yellow-300">{item.forme}</td>
                            <td className="px-4 py-2 border-b border-yellow-300">{item.presentation}</td>
                            <td className="px-4 py-2 border-b border-yellow-300">{item.dosage1 + item.uniteDosage1}</td>
                            <td className="px-4 py-2 border-b border-yellow-300">
                                <button className='bg-green-500 px-2 rounded-2xl text-white hover:bg-green-400 transition duration-300 '
                                    onClick={() => ajouterStock({
                                        nom: item.nom,
                                        dosage1: item.dosage1,
                                        forme: item.forme,
                                        uniteDosage1: item.uniteDosage1,
                                        ppv: item.ppv,
                                        presentation: item.presentation,
                                        stock: 12
                                    })}
                                >ajouter le produit</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>


        </div>
    );
};







export default ProduitJson;