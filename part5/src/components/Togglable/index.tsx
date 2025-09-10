import { useImperativeHandle, useState } from 'react';
import './index.css';

interface ITogglableProps {
  buttonLabel: string;
}

const Togglable = (props: any) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className='cancelBtn' onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default Togglable;
