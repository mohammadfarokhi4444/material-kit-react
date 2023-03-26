import { createContext, useReducer } from 'react';

export const UserStateContext = createContext();
export const UserDispatchContext = createContext();

export function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        fullName: action.payload.fullName,
        imageUrl: action.payload.imageUrl,
        roleName: action.payload.roleName,
        email: action.payload.email,
      };
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false, fullName: '', email: '', roleName: '' };
    case 'LOGIN_FAILURE':
      return { ...state, isAuthenticated: false, fullName: '', email: '', roleName: '' };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem('token'),
    fullName: localStorage.getItem('fullName') || '',
    email: localStorage.getItem('email') || '',
    roleName: localStorage.getItem('roleName') || '',
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export async function loginUser(username, password, dispatch, navigate, setIsLoading, setErrors) {
  setIsLoading(true);
  setErrors([]);
  setTimeout(() => {
    if (username !== 'abc@mail.com' || password !== '123456') {
      setErrors(['username or password is invalid']);
      setIsLoading(false);
      return;
    }
    const data = {
      token: 'pretty-good-token',
      fullName: 'Mohammad Farokhi',
      email: 'mohammadfarokhi4444@gmail.com',
      roleName: 'Admin',
    };
    localStorage.setItem('token', data.token);
    localStorage.setItem('fullName', data.fullName);
    localStorage.setItem('email', data.email);
    localStorage.setItem('roleName', data.roleName);
    setIsLoading(false);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        fullName: data.fullName,
        email: data.email,
        roleName: data.roleName,
      },
    });
    navigate('/app/dashboard');

  }, 1500);
}

export function signOut(dispatch, navigate) {
  localStorage.removeItem('token');
  localStorage.removeItem('fullName');
  localStorage.removeItem('email');
  localStorage.removeItem('roleName');
  dispatch({ type: 'SIGN_OUT_SUCCESS' });
  navigate('/login');
}
