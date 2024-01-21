import { useReducer } from "react";

const products = [
    {
        id:0,
        title:'Milk',
        price: 19.99,
        discountedPrice: 19.99
    },
    {
        id:1,
        title:'Bread',
        price: 12.99,
        discountedPrice: 12.99
    },
    {
        id:2,
        title:'Cheese',
        price: 25.99,
        discountedPrice: 25.99
    },
];

export const initialState = {cart: [], total: 0};

export function reducer(state,action){
    let productIndex;
    let newTotal;
    let cart;

    switch (action.type){
        case 'addProduct':
            //Create a new cart so we don't mutate our state
            cart = [...state.cart];
            //Get the product index
        productIndex = cart.findIndex(
            (product) => product.id === action.payload.id,
        );
        if(productIndex === -1){
            cart.push({...action.payload, quantity: 1});
        } else {
            //product exists so we increase quantity, 
            //but with a new array
            cart = [
                ...cart.slice(0, productIndex),
                {...cart[productIndex], quantity: cart[productIndex].quantity + 1},
                ...cart.slice(productIndex + 1),
            ];
        }
        //set the new total so we don't have to recalculate
        newTotal = cart.reduce((currentTotal, product) => {
            currentTotal += product.discountedPrice * product.quantity;
            return currentTotal;
        }, 0);
        return {...state, cart: cart, total: newTotal};
        
         //removing a product
        case 'removeProduct':
            cart = [...state.cart];
            productIndex = cart.findIndex(
                (product) => product.id === action.payload.id,
            );
            if(productIndex !== -1){
                if(cart[productIndex].quantity > 1){
                    //Decrease by one with new cart
                    cart = [
                        ...cart.slice(0, productIndex),
                        {
                            ...cart[productIndex],
                            quantity: cart[productIndex].quantity - 1,
                        },
                        ...cart.slice(productIndex + 1),
                    ];
                } else {
                    //Remove the item entirely if quantity is going to be 0
                    cart = [
                        ...cart.slice(0, productIndex),
                        ...cart.slice(productIndex + 1),
                    ];
                }
            }
            //set the new total 
            newTotal = cart.reduce((currentTotal, product) =>{
                currentTotal += product.discountedPrice * product.quantity;
                return currentTotal;
            }, 0);
            return {...state, cart: cart, total: newTotal};

            //Clearing the cart
            case 'clearCart': 
            return {cart: [], total: 0};

            default:
                return state;
    }
}

function App(){
    const [state,dispatch] = useReducer(reducer, initialState);

    return(
        <div>
        {products.map((product) => (
            <div key={product.id}>
            <button onClick={() => dispatch({type: 'addProduct', payload: product})}>
            Add {product.title}</button>
            <button onClick={() => dispatch({type: 'removeProduct', payload: product})}>
            Remove {product.title}</button>
            </div>
        ))}
        <div>
            <hr />
            <button onClick={() => dispatch({type: 'clearCart'})}>
                Clear cart
            </button>
            <button onClick={() => dispatch({type: 'getTotal'})}>
                Get total
            </button>
        </div>
        <div>{state.total}</div>
        <hr />
        <div>
            {state.cart.map((product) => {
                <div key={product.id}>
                    {product.quantity} - {product.title} - {product.discountedPrice}
                </div>
            })}
        </div>
        </div>
    );
}
export default App;