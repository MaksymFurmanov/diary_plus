import Milk2PercentImage from '../data/images/Milk_2%.png';
import Milk1Point5PercentImage from '../data/images/Milk_1.5%.png';
import Milk1PercentImage from '../data/images/Milk_1%.png';

const products = [
    {
        product_id: 0,
        name: "Mlieko",
        type: "2%",
        per_pallet: 30,
        pallet_color: "#F9CC5A",
        img: Milk2PercentImage,
        quality_standards: ""
    },
    {
        product_id: 1,
        name: "Mlieko",
        type: "1.5%",
        per_pallet: 30,
        pallet_color: "#9DB3FF",
        img: Milk1Point5PercentImage,
        quality_standards: ""
    },
    {
        product_id: 2,
        name: "Mlieko",
        type: "1%",
        per_pallet: 30,
        pallet_color: "#E32A4B",
        img: Milk1PercentImage,
        quality_standards: ""
    }
];

export default products;