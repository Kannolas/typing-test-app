import React from 'react';
import { FunctionComponent } from 'react';

import { useAppDispatch, useAppSelector } from './store/hooks/hooks';
import { setIsTestStarted, setIsTestFinished, setSentences } from './store/reducers/testSlice';

import Test from './Components/Test/Test';
import ModalWindow from './Components/ModalWindow/ModalWindow';
import Button from './Components/UI/Button/Button';
import Header from './Components/UI/Header/Header';
import Footer from './Components/UI/Footer/Footer';
const App:FunctionComponent = ()=> {
  const dispatch = useAppDispatch()
  const isTestStarted = useAppSelector(state => state.testSlice.isTestStarted)
  const testStateToggler = ()=>{
    dispatch(setIsTestStarted(true))
  }
  return (
    <>
    <Header/>
    <main className='main'>
      {isTestStarted?
      <Test/>:
        <ModalWindow title='Take a typing test'>
          <Button btnText='start' onClick={testStateToggler} />
        </ModalWindow>}
    </main>
    <Footer/>
    </>
  );
}

export default App;
