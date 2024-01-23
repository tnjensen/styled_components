import {create} from 'zustand';
import {shallow} from 'zustand/shallow';

const useProductsStore = create((set) => ({
    totalPrice: 0,
    addToCart: (productId) => {
        const product = products.findIndex((p) => p.id === productId);
        set((state) => ({
            totalPrice: state.totalPrice + product.price,
        }));
    },
   /*  addOne: () => set((state) => ({count: state.count + 1})), */
    clearCart: () => set({totalPrice:0}),
}));

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

function ZustandCart(){
    const {totalPrice, addToCart, clearCart} = useProductsStore(
        (state) => ({
          totalPrice: state.totalPrice,
          addToCart: state.addToCart,
          clearCart: state.clearCart,
        }),
        shallow,
      );
      return(
        <div>
        {products.map((product) => (
            <div key={product.id}>
            <button onClick={addToCart}>
            Add {product.title}</button>
            </div>
        ))}
        <div>
            <hr />
            <button onClick={clearCart}>
                Clear cart
            </button>
        </div>
        <div>{totalPrice}</div>
        <hr />
        <div>
            {products.map((product) => {
                <div key={product.id}>
                    {product.quantity} - {product.title} - {product.discountedPrice}
                </div>
            })}
        </div>
        </div>
    );
}
export default ZustandCart;