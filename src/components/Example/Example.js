import { useState, useEffect } from "react";

function Example(){
    const [showComponent, setShowComponent] = useState(true);

    function onButtonClick(){
        setShowComponent(false);
    
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
    
    return(
        <div>{showComponent ? <Example /> : null}
      <button onClick={onButtonClick}>Hide component</button>
      </div>
    )
}
export default Example;