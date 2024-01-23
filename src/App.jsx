import { ThemeProvider } from 'styled-components';
import * as S from './App.styles';
import MyComponent from './components/MyComponent/MyExample';
import Logo from './images/logo.png';
import { useState, useEffect, useReducer, createContext, useContext } from 'react';
import {create} from 'zustand';
import {shallow} from 'zustand/shallow';
import Cart from './components/Cart/Cart';
import ZustandCart from './components/ZustandCart/ZustandCart';
import Attack from './components/Game/Attack';

//Using only create, strict
const useProductsStore = create((set) => ({
  count: 0,
  addOne: () => set((state) => ({count: state.count + 1})),
  clearCount: () => set({count:0}),
}));

const ProductContext = createContext();

function ProductComponent(){
  const products = useContext(ProductContext);
  return(
    <div>
      {products.map((product) =>(
        <p key={product.id}>{product.id} - {product.title} - {product.price}</p>
      ))}
    </div>
  )
}
const ThemeContext = createContext();

function MyThemeComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <div>The display mode is {theme}</div>
      <button onClick={toggleTheme}>Change theme</button>
    </div>
  );
}
// This is our initial state
const initialState = {hitPoints: 100};

function reducer(state,action){
    // These are actions that can be dispatched
  switch(action.type){
    /* case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return {count: 0}; */
    case 'attack':
      if(state.hitPoints > 0){
        if(Math.random() <= 0.5){
          return {hitPoints: state.hitPoints - action.payload};
        }
        return {hitPoints: state.hitPoints - action.payload*4};        
      }
      else {
        return {hitPoints: 0}
      }
        
    case 'reset':
      return {hitPoints: 100};

    default:
      throw new Error();
  }
}
const theme = {
  color: {
    primary: 'blue',
    secondary: 'red'
  }
};

function Example(){
 
  useEffect(() => {
      /* console.log('useEffect has run'); */
     /*  const timerId = setInterval(() => {
        console.log('Timer running')
      }, 1000); */
  
      /* return () => {
        clearInterval(timerId);
      }; */
    }, []);
  
  return(
      <div>Example is showing</div>
  )
}

function App() {
  const [isActive, setIsActive] = useState(true);
  const [counter, setCounter] = useState(0);
  const [showComponent, setShowComponent] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState('dark');
  //using only create, strict
  /* const count = useProductStore((state) => state.count);
  const addOne = useProductStore((state) => state.addOne);
  const clearCount = useProductStore((state) => state.clearCount); */
  //Using create,shallow
  const {count, addOne, clearCount} = useProductsStore(
    (state) => ({
      count: state.count,
      addOne: state.addOne,
      clearCount: state.clearCount,
    }),
    shallow,
  );

  const products = [
    { id: 0, title: 'Bread', price: 19.99 },
    { id: 1, title: 'Milk', price: 29.99 },
    { id: 2, title: 'Cheese', price: 35.99 },
    { id: 3, title: 'Water', price: 15.99 },
  ];
  function toggleTheme(){
    if(theme === 'dark'){
      setTheme('light');
    }else{
      setTheme('dark');
    }
  }
  function onShowButtonClick(){
    setShowComponent(false);
}
  function onButtonClick(){
    setIsActive(!isActive);
  }
 
  function onIncrementCounter(){
    setCounter(counter + 1);
  }
  function onDecrementCounter(){
    setCounter(counter - 1);
  }

  console.log('Component has rendered');

  return (
    <div>
      <img src={Logo} alt='Logo' />
      <S.Container>
        <S.Heading>Hello World!</S.Heading>
      <S.Item>Item 1</S.Item>
      <S.Item isActive={true}>Item 2</S.Item>
      <S.Item isActive>Item 3</S.Item>
      <S.Item>Item 4</S.Item>
      </S.Container>
      <S.BaseButton>Base button</S.BaseButton>
      <S.PrimaryButton>Primary button</S.PrimaryButton>
      <MyComponent />
      {/* <ThemeProvider theme={theme}>
        <S.ThemedButton isActive={true}>Click me</S.ThemedButton>
      </ThemeProvider> */}
      <p>
        <S.PrimaryButton onClick={onButtonClick}>Change state</S.PrimaryButton>
      </p>
      <p>{isActive ? 'I am active' : 'I am not active'}</p>
      <p>Counter: {counter}</p>
      <button onClick={onIncrementCounter}>+</button>
      <button onClick={onDecrementCounter}>-</button>
      <div>{showComponent ? <Example /> : null}
      <button onClick={onShowButtonClick}>Hide component</button>
      </div>
      {/* <div>Count: {state.count}</div>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'addAmount', payload: 10})}>Add 10</button>
      <button onClick={() => dispatch({type: 'reset'})}>Reset</button> */}
      {/* <div>Enemy hit points: {state.hitPoints}
      <p>{state.hitPoints === 0 ? "You've died!" : ""}</p>
      <p>{state.hitPoints === 0 ? <button onClick={() => dispatch({type: 'reset'})}>Play again</button> : <button onClick={() => dispatch({type: 'attack', payload: 10})}>Attack</button>}</p>
      </div> */}
      <Attack />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div>
          <MyThemeComponent /> 
        </div>
      </ThemeContext.Provider>
      <ProductContext.Provider value={products}>
        <div>
          <ProductComponent />
        </div>
      </ProductContext.Provider>
      <div>
        <div>Count: {count}</div>
        <div><button onClick={addOne}>Add one</button></div>
        <div><button onClick={clearCount}>Clear</button></div>
      </div>
      <Cart />
      <ZustandCart />
    </div>
  );
}

export default App;

