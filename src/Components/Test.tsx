import { FunctionComponent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { fetchText, setText, setCurrentCharIndex, increasePressingCount, setMistakes, resetTextState } from '../store/reducers/textSlice';
import { getCurrentChar, compareChars, restoreText } from '../helpers/charTransform';
import { accuracyCounting, speedCounting } from '../helpers/stateCounting';

import Stats from './Stats';
import Button from './UI/Button/Button';

import { increaseSeconds, resetSeconds, setIsTimerOn } from '../store/reducers/timerSlice';
import { resetTestState, setIsTestFinished } from '../store/reducers/testSlice';
import ModalWindow from './ModalWindow/ModalWindow';
import { MutatingDots } from 'react-loader-spinner';

const Test:FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const text = useAppSelector(state => state.textSlice.text);
  const isLoading = useAppSelector(state => state.textSlice.isLoading);
  const error = useAppSelector(state => state.textSlice.error)
  const currentCharIndex = useAppSelector(state => state.textSlice.currentCharIndex)
  const mistakes = useAppSelector(state => state.textSlice.mistakes)
  const pressingCount = useAppSelector(state => state.textSlice.pressingCount)
  const sentences = useAppSelector(state => state.testSlice.sentences)
  const seconds = useAppSelector(state => state.timerSlice.seconds)
  const isTimerOn = useAppSelector(state => state.timerSlice.isTimerOn)
  const isTestFinished = useAppSelector(state => state.testSlice.isTestFinished);
  const [speed, setSpeed] = useState('0.00');
  const [accuracy, setAccuracy] = useState('0.00');

  
  function restart(){
    dispatch(resetSeconds())
    dispatch(resetTextState())
    dispatch(setText(restoreText(text)))

    if(isTestFinished){
      dispatch(setIsTestFinished(false))
    }
  }
  function newTest(){
    dispatch(resetTestState())
    dispatch(resetTextState())
    dispatch(resetSeconds())
  }

  useEffect(()=>{
    dispatch(fetchText(sentences))
  }, [dispatch])

  useEffect(()=>{
    const newText = getCurrentChar(text, currentCharIndex);
    dispatch(setText(newText))
  }, [dispatch, currentCharIndex])

  useEffect(()=>{
    if(pressingCount === 1 && text.length>0){
      dispatch(setIsTimerOn(true))
    }

    if(currentCharIndex < text.length){
      const keyPressHandler = (event:KeyboardEvent)=>{
        event.preventDefault()
        const [newText, newCurrentIndex, newMistakes] = compareChars(text, currentCharIndex, event.key, mistakes)
        dispatch(setCurrentCharIndex(newCurrentIndex))
        dispatch(setText(newText))
        dispatch(setMistakes(newMistakes))
        dispatch(increasePressingCount())

        if(newCurrentIndex === text.length){
          dispatch(setIsTimerOn(false));
          dispatch(setIsTestFinished(true))
        }
      }
      document.addEventListener('keypress', keyPressHandler)
      return () => {
        document.removeEventListener('keypress', keyPressHandler);
      };
    }
  }, [dispatch, text])


  useEffect(()=>{
    if(isTimerOn){
      const timer = setTimeout(() => {
        dispatch(increaseSeconds())
      }, 1000);
    }
  }, [isTimerOn, seconds, dispatch])

  useEffect(()=>{
    const correctLetters = pressingCount - mistakes;
    setAccuracy(accuracyCounting(mistakes, pressingCount))
    setSpeed(speedCounting(correctLetters, seconds))
  }, [mistakes, pressingCount, seconds])

  return (
    <div className={'test'}>
      <div className={"test-text"}>
        {error && <p className='error-text'>{error}</p>}
        {isLoading?<><MutatingDots 
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor= '#4fa94d'
          radius='12.5'
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
 /></>
 :
  text.map((item, index)=>{
    return(
      <span className={item.class} key={index}>{item.char}</span>
    )
  })
}</div>
        
        <Stats>
        <Button 
            onClick={restart}
            onFocus={(event)=>{event.target.blur()}}
            btnText='RESTART'/>
        </Stats>
        {
          isTestFinished && 
          <ModalWindow title='Test completed!'>
            <Stats>
            <Button
              onClick={restart}
              btnText='RESTART'
              />
              <Button
              onClick={newTest}
              btnText='NEW TEST'
              />
            </Stats>
          </ModalWindow>
        }
    </div>
  );
};

export default Test;