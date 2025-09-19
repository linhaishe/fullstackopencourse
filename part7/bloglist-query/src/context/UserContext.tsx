import { createContext, useContext, useReducer, type ReactNode } from 'react';

type UserContextType = {
  user: {
    name: string;
    pwd?: string;
  };
  setUser: (user: UserContextType['user']) => void;
};

const UserContext = createContext<UserContextType>({
  user: {
    name: '',
    pwd: undefined,
  },
  setUser: function (user: UserContextType['user']): void {
    throw new Error('Function not implemented.');
  },
});

const UserReducer = (
  state: {
    name: '';
    pwd: '';
  },
  action: any
) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, {
    name: '',
    pwd: '',
  });

  const setUser = (user: any) => {
    dispatch({ type: 'SET', payload: user });
  };

  return (
    <UserContext.Provider value={{ user: state, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
