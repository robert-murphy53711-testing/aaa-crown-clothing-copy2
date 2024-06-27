import {useState, createContext, useContext} from 'react';

const getIndex = (cartItems, product) => {
    let index = -1;
    if( cartItems != null && product != null ) {
        index = cartItems.findIndex( (elem) => {
            return elem.id == product.id;
        })
    }

    return index;
} 


const getCartItem = (cartItems, product, index) => {
    let cartItem = null;
    if( index < 0 ) {
        cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 0,
        }
    }
    else {
        cartItem = cartItems[index];
    }
    return cartItem;
}


const removeCartItem = (cartItems, productToRemove) => {

    let index = getIndex(cartItems, productToRemove );
    let cartItem = getCartItem(cartItems, productToRemove, index);
    cartItem.quantity--;
    if( index < 0 )
        cartItems.splice(index, 1);

    return cartItems;
}


const addCartItem = (cartItems, productToAdd) => {


    //return cartItems;
    const existingCartItem = cartItems.find( (elem) => {
        return elem.id == productToAdd.id;
    }); 



    if( existingCartItem != null ) {
        return cartItems.map( (elem) => {
            let rtn = elem.id == existingCartItem.id ? {
                ...existingCartItem,
                 key: existingCartItem.id, 
                 quantity: existingCartItem.quantity + 1
            } : elem;

            return rtn;
        })
    }

    // if found, increment quantity

    // return new array with modified cart items
    let item = [...cartItems, {...productToAdd, quantity: 1}];
    return item;
    //return [...cartItems, {...productToAdd, quantity: 1}];
    
}

export const CartContext = createContext({
    isCartOpen: Boolean,
    setIsCartOpen: () => null, 
    cartItems: [],
    addItemToCart: (productToAdd) => null,
    removeItemFromCart: (productToRemove) => null,
    emptyCart: () => null,
});


export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(
            addCartItem(cartItems, productToAdd)
        );
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(
            removeCartItem(cartItems, productToRemove)
        );
    }

    const emptyCart = () => {
        setCartItems( [] );
    }


    const value = {
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        removeItemFromCart, 
        emptyCart
    };


    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}