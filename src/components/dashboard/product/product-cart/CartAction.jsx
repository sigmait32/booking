// import { useSelector } from "react-redux";
// import { updateQuantity, removeFromCart } from "../../../store/features/cart/cartSlice";

// const CartAction = ({ productId }) => {
//     const cart = useSelector((state) => state.cart.items);

//     const getCartItem = (id) => cart.find((item) => item._id === id);


//     const cartItem = getCartItem(productId);

//     console.log("Product cart item is:", cartItem);

//     return (
//         <>

//             {/* {cartItem ? (
//                 <p>Quantity in Cart: {cartItem.quantity}</p>
//             ) : (
//                 <p>Not in cart</p>
//             )} */}

//             <div className="quantity-control">
//                 <button
//                     className="quantity-btn minus"
//                     onClick={() =>
//                         cartItem?.quantity === 1
//                             ? dispatch(removeFromCart(product._id))
//                             : dispatch(updateQuantity({ _id: product._id, quantity: cartItem?.quantity - 1 }))
//                     }
//                 >
//                     {cartItem?.quantity === 1 ? (
//                         <i className="fa fa-trash"></i>
//                     ) : (
//                         <i className="fa fa-minus"></i>
//                     )}
//                 </button>
//                 <span className="quantity-value">
//                     {cartItem?.quantity}
//                 </span>
//                 <button
//                     className="quantity-btn plus"
//                     onClick={() => dispatch(updateQuantity({ _id: product._id, quantity: cartItem?.quantity + 1 }))}
//                 >
//                     <i className="fa fa-plus"></i>

//                 </button>
//             </div>
//         </>
//     );
// };

// export default CartAction;

import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeFromCart } from "../../../store/features/cart/cartSlice";

const CartAction = ({ productId }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);

    const cartItem = cart.find((item) => item._id === productId);

    if (!cartItem) {
        return null; // or show an "Add to Cart" button here instead
    }

    return (
        <div className="quantity-control">
            <button
                className="quantity-btn minus"
                onClick={() =>
                    cartItem.quantity === 1
                        ? dispatch(removeFromCart(productId))
                        : dispatch(updateQuantity({ _id: productId, quantity: cartItem.quantity - 1 }))
                }
            >
                {cartItem.quantity === 1 ? (
                    <i className="fa fa-trash"></i>
                ) : (
                    <i className="fa fa-minus"></i>
                )}
            </button>
            <span className="quantity-value">{cartItem.quantity}</span>
            <button
                className="quantity-btn plus"
                onClick={() =>
                    dispatch(updateQuantity({ _id: productId, quantity: cartItem.quantity + 1 }))
                }
            >
                <i className="fa fa-plus"></i>
            </button>

        </div>
    );
};

export default CartAction;
