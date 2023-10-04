import React from 'react';
import { FunctionComponent } from 'react';

import { useAppDispatch, useAppSelector } from './store/hooks/hooks';
import { setIsTestStarted, setIsTestFinished, setSentences } from './store/reducers/testSlice';

import Test from './Components/Test';
import ModalWindow from './Components/ModalWindow/ModalWindow';
import Button from './Components/UI/Button/Button';
import Header from './Components/UI/Header/Header';
import Footer from './Components/UI/Footer/Footer';
import Select from './Components/UI/Select/Select';
const App:FunctionComponent = ()=> {
  const dispatch = useAppDispatch()
  const isTestStarted = useAppSelector(state => state.testSlice.isTestStarted)
  const sentences = useAppSelector(state=> state.testSlice.sentences)
  const sentencesOptions = [
    {value: '1', name: '1'},
    {value: '2', name: '2'},
    {value: '3', name: '3'},
    {value: '4', name: '4'},
    {value: '5', name: '5'},
  ];
  const testStateToggler = ()=>{
    dispatch(setIsTestStarted(true))
  }

  const changeSentences = (value:string)=>{
    dispatch(setSentences(value))
  }
  return (
    <>
    <Header/>
    <main className='main'>
      {isTestStarted?
      <Test/>:
        <ModalWindow title='Take a typing test'>
          <div className="choose-sentenses">Choose number of sentences</div>
          <Select
            id='select-sentences'
            defaultValue={sentences}
            options={sentencesOptions}
            onChange={(event)=> changeSentences(event.target.value)}
          />
          <Button btnText='start' onClick={testStateToggler} />
        </ModalWindow>}
    </main>
    <Footer/>
    </>
  );
}

export default App;
