import { useContext } from 'react';
import { UserDispatchContext } from '../contexts/UserContext';

function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

export default useUserDispatch;
