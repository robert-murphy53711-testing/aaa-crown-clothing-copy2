
import './cart-item.styles.scss';

const CartItem = ({cartItem}) => {
    const {name, imageaurl, price, quantity} = cartItem;

    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${price}</span>
            </div>
            <h2>{name}</h2>
        </div>
    );
}

export default CartItem;