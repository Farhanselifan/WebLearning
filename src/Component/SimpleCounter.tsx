import React, { useState } from 'react';


const SimpleCounter: React.FC = () => {
  const [state, setState] = useState(0);

  const increment = () => setState(state+1);

  const decrement = () => setState(state-1);

  const resetStep = () => setState(0);

  return (
    <div className='w-100 bg-white rounded-4xl border 
    border-gray-300 shadow-2xl items-center p-8' >
      <h2 className='flex justify-center font-semibold font'>More Simple Count: </h2>
      <h2 className='flex justify-center text-8xl text-green-400 p-5'>{state}</h2>
      <div className='flex justify-center gap-5'>
        <button className= 'w-7 bg-blue-500 rounded' onClick={increment}>+</button>
        <button className= 'w-7 bg-amber-500 rounded' onClick={decrement}>-</button>
      </div>
    
      <div className= 'flex justify-center p-5'>
        <button className='bg-red-400 p-2 rounded from-neutral-50' onClick={resetStep}> Reset </button>
      </div>
      
    </div>
  );
};

export default SimpleCounter;