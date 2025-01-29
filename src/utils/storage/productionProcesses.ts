import {ProductionProcess} from "../../types";

export const getProductionProcesses = (): ProductionProcess[] | null => {
    const productionProcessesRaw = localStorage.getItem("productionProcesses");
    if(!productionProcessesRaw) return null;

    return JSON.parse(productionProcessesRaw) as ProductionProcess[];
}

export const getProductionProcessesByProduct = (productId?: string): ProductionProcess[] | null => {
    if(!productId) return null;

    const productionProcessesRaw = localStorage.getItem("productionProcesses");
    if(!productionProcessesRaw) return null;
    const data = JSON.parse(productionProcessesRaw) as ProductionProcess[];

    return data.filter((productionProcess) =>
        productionProcess.product_id === productId
    );
}

export const updateProcesses = (processes: ProductionProcess[], productId) => {
  let allProcesses = getProductionProcesses() || [];
  if(!getProductById(productId)) throw new Error("The product not Found");
  
  const processesSet = new Set(processes);
  
  let changedPlaces = stockPlaces.map((stockPlace) => {
      if(placesSet.has(stockPlace.id)) {
        placesSet.delete(stockPlace.id);
          return {
            ...stockPlace,
            material_id: materialId
          }
      }
     
     return stockPlace;
    });
    
   placesSet.forEach(place => {
     changedPlaces.push({
       id: place,
       material_id: materialId
     })
   });
    localStorage.set("entryStockPlaces", changedPlaces);
  
}