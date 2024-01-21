import { ThemeProvider } from 'styled-components';
import * as S from './App.styles';
import MyComponent from './components/MyComponent/MyExample';
import Logo from './images/logo.png';
import { useState, useEffect, useReducer } from 'react';

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

  function onShowButtonClick(){
    setShowComponent(false);
}
  function onButtonClick(){
    setIsActive(!isActive);
  }
 
  function onIncrementCunter(){
    setCounter(counter + 1);
  }
  function onDecrementCunter(){
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
      <ThemeProvider theme={theme}>
        <S.ThemedButton isActive={true}>Click me</S.ThemedButton>
      </ThemeProvider>
      <p>
        <S.PrimaryButton onClick={onButtonClick}>Change state</S.PrimaryButton>
      </p>
      <p>{isActive ? 'I am active' : 'I am not active'}</p>
      <p>Counter: {counter}</p>
      <button onClick={onIncrementCunter}>+</button>
      <button onClick={onDecrementCunter}>-</button>
      <div>{showComponent ? <Example /> : null}
      <button onClick={onShowButtonClick}>Hide component</button>
      </div>
      {/* <div>Count: {state.count}</div>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'addAmount', payload: 10})}>Add 10</button>
      <button onClick={() => dispatch({type: 'reset'})}>Reset</button> */}
      <div>Enemy hit points: {state.hitPoints}
      <p>{state.hitPoints === 0 ? "You've died!" : ""}</p>
      <p>{state.hitPoints === 0 ? <button onClick={() => dispatch({type: 'reset'})}>Play again</button> : <button onClick={() => dispatch({type: 'attack', payload: 10})}>Attack</button>}</p>
      </div>
    </div>
  );
}

export default App;
