import PRODUCTS from '../shop-data.json';
import {createContext, useState, useEffect} from 'react';


export const ProductsContext = createContext({
    currentProducts: null,
    setCurrentProducts: () => null
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products: products, 
        setProducts: setProducts};
        //console.log(products);

/*     useEffect( () => {

        console.log('SHOP_DATA == ' + SHOP_DATA );
        setCurrentProducts( SHOP_DATA );
    }, []); */
    return <ProductsContext.Provider value={value}>
        {children}
    </ProductsContext.Provider>

}




