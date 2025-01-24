export type DisplayPlaceData = {
  pallet_color: string,
  per_pallet: number,
  name: string,
  details: string
}

const getStockPlaceData = (items: Material[] | Order[], type: "entry" | "output") => {
  if (type === "entry") {
  if (item.arriving_date !== null) {
    return {
      pallet_color: item.pallet_color,
      per_pallet: item.per_pallet,
      name: `Raw material: ${item.name}`,
      details: `Source: ${item.supplier}`
    }
  }
} else if (type === "output") {
  return {
    pallet_color: item.pallet_color,
    per_pallet: item.per_pallet,
    name: `Product: ${item.name}`,
    details: `Type: ${item.type}`
  }
}
}