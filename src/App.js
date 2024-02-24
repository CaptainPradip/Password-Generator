
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
function App() {
  const [password , setPassword] = useState('');
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(true);
  const [length, setLength] = useState(8);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const passwordRef = useRef(null);
  const generatePassword = useCallback (() => {
    setPasswordCopied(false);
    let char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = '0123456789';
    let special = '!@#$%^&*()_+';
    let password = '';
    let charSet = '';
    charSet += char;
    if(numberAllowed){
      charSet += number;
    }
    if(charAllowed){
      charSet += special;
    }
    for(let i = 0; i < length; i++){
      let randomIndex = Math.floor(Math.random() * charSet.length );
      password += charSet[randomIndex];
    }
    setPassword(password);
  }
  ,[numberAllowed, charAllowed, length]);

  useEffect(() => {
    generatePassword();
  }
  ,[numberAllowed, charAllowed, length, generatePassword]);

const copyPassword = (password) => {
  navigator.clipboard.writeText(password);
  passwordRef.current.select();
  setPasswordCopied(true);
}

  return (
    <>
    <div className='w-full max-w-md mx-auto'>
      <h1 className='text-center text-3xl font-bold mb-4'>Password Generator</h1>
      <div className='bg-lime-100 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
          Password
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='password'
          type='text'
          placeholder='Password'
          value={password}
          readOnly = {true}
          ref={passwordRef}
          onChange={(e) => setPassword(e.target.value)}
        />

        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=> copyPassword(password)}> Copy</button>
        {passwordCopied && <p className='text-green-500'>Password Copied</p>}
        <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='length'>
          Length
        </label>
        <input 
          id='length'
          type='range'
          className='cursor-pointer'
          placeholder='Length'
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />  {length}
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='length'>
          Include Numbers
        </label>
        <input
          type='checkbox'
          checked={numberAllowed}
          onChange={(e) => setNumberAllowed(e.target.checked)}
        />
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='length'>
          Include Special Characters
        </label>
        <input
          type='checkbox'
          checked={charAllowed}
          onChange={(e) => setCharAllowed(e.target.checked)}
        />
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
