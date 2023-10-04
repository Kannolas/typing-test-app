import { FunctionComponent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { fetchText, setText, setCurrentCharIndex, increasePressingCount, setMistakes } from '../../store/reducers/textSlice';
import { getCurrentChar, compareChars } from '../../helpers/charTransform';
import { accuracyCounting, speedCounting } from '../../helpers/stateCounting';

import Button from '../UI/Button/Button';
import c from './Test.module.css'
import { increaseSeconds, setIsTimerOn } from '../../store/reducers/timerSlice';
import { setIsTestFinished } from '../../store/reducers/testSlice';

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
  const [speed, setSpeed] = useState('0.00');
  const [accuracy, setAccuracy] = useState('0.00');

  useEffect(()=>{
    dispatch(fetchText(sentences))
  }, [dispatch])

  useEffect(()=>{
    const newText = getCurrentChar(text, currentCharIndex);
    dispatch(setText(newText))
  }, [dispatch, currentCharIndex])

  useEffect(()=>{
    if(pressingCount === 0 && text.length>0){
      dispatch(setIsTimerOn(true))
    }

    if(currentCharIndex < text.length){
      const keyPressHandler = (event:KeyboardEvent)=>{
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
    <div className={c.test}>
        <div className={c["test-text"]}>{
          text.map((item, index)=>{
            return(
              <span className={item.class} key={index}>{item.char}</span>
            )
          })
        }</div>
        <div className={c["test-stats"]}>
            <div className={c["test-stats-speed"]}>SPEED</div>
            <div className={c["test-stats-speed-value"]}>{speed} LPM</div>
            <div className={c["test-stats-accuracy"]}>ACCURACY</div>
            <div className={c["test-stats-accuracy-value"]}>{accuracy} %</div>
            <Button btnText='RESTART'/>
        </div>
    </div>
  );
};

export default Test;