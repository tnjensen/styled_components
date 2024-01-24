import { useReducer} from "react";

export const initialState = {hitPoints: 100};

export function reducer(state,action){
  switch(action.type){
    case 'attack':
      if(state.hitPoints > 0){
        if(Math.random() <= 0.5){
          return {hitPoints: state.hitPoints - action.payload};
        }
        let newPoints =  state.hitPoints - action.payload * 4;
        if(newPoints < 0){
           newPoints = 0;
        }
        return {hitPoints: newPoints};        
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

function Attack(){
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <div>Enemy hit points: {state.hitPoints}
      <p>{state.hitPoints === 0 ? "You've died!" : ""}</p>
      <p>{state.hitPoints === 0 ? <button onClick={() => dispatch({type: 'reset'})}>Play again</button> : <button onClick={() => dispatch({type: 'attack', payload: 10})}>Attack</button>}</p>
      </div>
    )
}
export default Attack;
