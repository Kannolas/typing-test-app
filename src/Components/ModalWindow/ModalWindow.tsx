import { FunctionComponent } from 'react';
import c from './ModalWindow.module.css'


type ModalWindowProps = {
  children: JSX.Element | JSX.Element[];
  title: string;
};

const ModalWindow:FunctionComponent<ModalWindowProps> = ( {children, title} ) => {
  return (
    <div className={c['modal-window-blackout']}>
      <div className={c['modal-window']}>
        <h2 className={c['modal-window-title']}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;