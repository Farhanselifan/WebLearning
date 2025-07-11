import React, { useState } from 'react';

interface CounterState {
  count: number;
  step: number;
}

const CounterApp: React.FC = () => {
  const [state, setState] = useState<CounterState>({
    count: 0,
    step: 1
  });

  const increment = () => {
    setState(prev => ({ ...prev, count: prev.count + prev.step }));
  };

  const decrement = () => {
    setState(prev => ({ ...prev, count: prev.count - prev.step }));
  };

  const updateStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, step: parseInt(e.target.value) || 1 }));
  };

  return (
    <div className='w-100 bg-white rounded-4xl border 
    border-gray-300 shadow-2xl items-center p-8'>
      <h2 className='flex justify-center font-semibold font'>Count: </h2>
      <h2 className='flex justify-center text-8xl text-green-400 p-5'>{state.count}</h2>
      <div className='flex justify-center gap-5'>
        <button className= 'w-7 bg-blue-500 rounded' onClick={increment}>+</button>
        <button className= 'w-7 bg-amber-500 rounded' onClick={decrement}>-</button>
      </div>
    
      <div className= 'flex justify-center p-5'>
        <h1  className=''> Step :  </h1>
        <label className= ''>
          <input className= 'border  border-gray-300 w-20 rounded'
            type="number" 
            value={state.step} 
            onChange={updateStep}
            min="1"
          />
        </label>
      </div>
      
    </div>
  );
};

export default CounterApp;