import { useState, useEffect, FunctionComponent } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { accuracyCounting, speedCounting } from "../helpers/stateCounting";
import { increaseSeconds, resetSeconds } from "../store/reducers/timerSlice";
import { resetTextState, setText } from "../store/reducers/textSlice";
import { restoreText } from "../helpers/charTransform";
import { setIsTestFinished } from "../store/reducers/testSlice";

import Button from "./UI/Button/Button";

type StatsProps = {
    children?: JSX.Element | JSX.Element[];
  };

const Stats: FunctionComponent<StatsProps> = ({children})=>{
    const dispatch = useAppDispatch();
    const mistakes = useAppSelector(state => state.textSlice.mistakes);
    const pressingCount = useAppSelector(state => state.textSlice.pressingCount);
    const seconds = useAppSelector(state => state.timerSlice.seconds);
    const isTimerOn = useAppSelector(state => state.timerSlice.isTimerOn);
    const isTestFinished = useAppSelector(state => state.testSlice.isTestFinished);
    const text = useAppSelector(state => state.textSlice.text);
    const [speed, setSpeed] = useState('0.00');
    const [accuracy, setAccuracy] = useState('0.00');

    

    useEffect(() => {
        const correctLetters = pressingCount - mistakes;
        
        setAccuracy(accuracyCounting(mistakes, pressingCount));
        setSpeed(speedCounting(correctLetters, seconds));
      }, [mistakes, pressingCount, seconds]);
    
      useEffect(() => {
        if (isTimerOn) {
          const timer = setTimeout(() => {
            dispatch(increaseSeconds());
          }, 1000);
          return () => clearTimeout(timer);
        }
      }, [isTimerOn, seconds, dispatch]);
      return(
        <div className={"test-stats"}>
            <div className={"test-stats-speed"}>SPEED</div>
            <div className={"test-stats-speed-value"}>{speed} LPM</div>
            <div className={"test-stats-accuracy"}>ACCURACY</div>
            <div className={"test-stats-accuracy-value"}>{accuracy} %</div>
            {children}
        </div>
      )
}

export default Stats