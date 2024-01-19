import { ThemeProvider } from 'styled-components';
import * as S from './App.styles';
import MyComponent from './components/MyComponent/MyExample';
import Logo from './images/logo.png';
import { useEffect, useState } from 'react';
import Example from './components/Example/Example';

const theme = {
  color: {
    primary: 'blue',
    secondary: 'red'
  }
};

function App() {
  const [isActive, setIsActive] = useState(true);
  const [counter, setCounter] = useState(0);
  const [showComponent, setShowComponent] = useState(true);

  function onButtonClick(){
    setIsActive(!isActive);
  }
  function onShowButtonClick(){
    setShowComponent(false);

  }
  function onIncrementCunter(){
    setCounter(counter + 1);
  }
  function onDecrementCunter(){
    setCounter(counter - 1);
  }

  useEffect(() => {
    /* console.log('useEffect has run'); */
    const timerId = setInterval(() => {
      console.log('Timer running')
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

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
      <div>{showComponent ? <Example /> : null}</div>
      <button onClick={onShowButtonClick}>Hide component</button>
    </div>
  );
}

export default App;
