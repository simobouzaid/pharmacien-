export type produitType ={
    id:number,
    name:string,
    dosage:string,
    presentation:string,
    form:string,
    prix:number,
    number?:number
    idStock?:number,
    
}

export type produitResponse = {
  get_produit: produitType
  number?: number
  id?: number
}


export type produitStockSearch =produitType&
{
  get_stock:{
    number:number
  }
}