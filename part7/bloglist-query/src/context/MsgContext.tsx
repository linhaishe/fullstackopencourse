import { createContext, useContext, useReducer, type ReactNode } from 'react';

type MsgContextType = {
  msg: {
    msgContent: string;
    isError: null | boolean;
  };
  showMsg: (msg: MsgContextType['msg']) => void;
};

const MsgContext = createContext<MsgContextType>({
  msg: {
    msgContent: '',
    isError: null,
  },
  showMsg: function (msg: MsgContextType['msg']): void {
    throw new Error('Function not implemented.');
  },
});

const initialState = {
  msgContent: '',
  isError: null,
};

const MsgReducer = (state: MsgContextType['msg'], action: any) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'CLEAR':
      return '';

    default:
      return state;
  }
};

export const MsgProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(MsgReducer, initialState);
  let timeoutId: string | number | NodeJS.Timeout | undefined; // 用于保存 setTimeout ID，保证每次通知刷新时可以清掉上一次的

  const showMsg = (message: MsgContextType['msg'], seconds = 5) => {
    dispatch({ type: 'SET', payload: message });
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, seconds * 1000);
  };

  return (
    <MsgContext.Provider value={{ msg: state, showMsg }}>
      {children}
    </MsgContext.Provider>
  );
};

// custom hook
export const useMsg = () => useContext(MsgContext);
