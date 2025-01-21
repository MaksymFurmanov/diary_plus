const ProductsGallery = () => {
  const products = getProducts();
  const user = useUser();
  
  const [cardsIndex, setCardsIndex] = useState(0);
  
  const productCards = products.map((product, index) => {
        return (
        <div key={index} className={"product-card"}>
            <img src={product.img_url || placeholder} alt={""}/>
            <p>Product: {product.name}</p>
            <p>Type: {product.type}</p>
            {user.manager && (
            <Button onClick={() =>
                navigate(`edit/${product.id}`)} colorType={2}
                >
                More
            </Button>
            )}
        </div>
        );
    });

    const swipeHandler = (direction) => {
        if (direction === 'left' && cardsIndex > 0) {
            setCardsIndex(cardsIndex - 1);
        } else if (direction === 'right' && cardsIndex < products.length - 3) {
            setCardsIndex(cardsIndex + 1);
        }
    }
  
  return (
    <div className={"evenly"}>
                <div className={"h-center"} style={{zIndex: 3}}>
                    <button className={"products-arrow"}
                            onClick={() => swipeHandler("left")}
                            disabled={cardsIndex === 0}>
                        <IoIosArrowBack/>
                    </button>
                </div>
                
                <div className={"product-cards"}>
                    <div style={{transform: `translateX(-${cardsIndex * 100 / 3}%)`}}>
                        {productCards}
                    </div>
                </div>
                
                <div className={"h-center"} style={{zIndex: 3}}>
                    <button className={"products-arrow"}
                            onClick={() =>
                                swipeHandler("right")}
                            disabled={cardsIndex >= products.length - 3}>
                        <IoIosArrowForward/>
                    </button>
                </div>
            </div>
    );
}