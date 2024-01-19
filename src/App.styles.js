import styled from 'styled-components';

export const Item = styled.li`
    background-color: ${(props) => (props.isActive ? 'red' : '')};
`;

export const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  padding: 15px;
  list-style: none;
`;

export const Heading = styled.h1`
  color: red;
`;

export const BaseButton = styled.button`
    background-color: white;
    border: 2px solid black;
    border-radius: 6px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color linear 800ms;

    :hover{
        background-color: black;
        color: white;
    }
`;

export const PrimaryButton = styled(BaseButton)`
    background-color: red;
    color: white;
`;

export const ThemedButton = styled.button`
    padding: 10px 20px;
    background: ${(props) => (props.isActive ? props.theme.color.primary : props.theme.color.secondary)};
    border-radius: 6px;
    border: 0;
    color: white;
    cursor: pointer;
`;