import React, { useState } from 'react';

interface UserFormState {
    name : string ;
    email : string ;
    age : string ;
}


function FormNuseState() {
  const [user, setUser] = useState<UserFormState>({
    name: '',
    email: '',
    age: ''
  });

  const handleInputChange = (e :React.ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = e.target;
    setUser( prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e :React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    console.log('User data:', user);
  };

  return (
    <form className='w-100 border border-blue-100 rounded-2xl p-15
    shadow-2xl shadow-blue-300' onSubmit={handleSubmit}>
      <div className='p-3'>
        <label>Name:</label>
        <input className='border border-gray-100 rounded'
          type="text" 
          name="name" 
          value={user.name} 
          onChange={handleInputChange} 
        />
      </div>
      <div className='p-3'>
        <label>Email:</label>
        <input className='border border-gray-100 rounded'
          type="email" 
          name="email" 
          value={user.email} 
          onChange={handleInputChange} 
        />
      </div>
      <div className='p-3'>
        <label>Age:</label>
        <input className='border border-gray-100 rounded'
          type="number" 
          name="age" 
          value={user.age} 
          onChange={handleInputChange} 
        />
      </div>
      <div className='flex justify-center'>
        <button className='bg-amber-400 p-3 rounded-2xl' type="submit">Submit</button>
      </div>
      
    </form>
  );
}

export default FormNuseState;