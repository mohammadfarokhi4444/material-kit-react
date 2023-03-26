import { useContext } from 'react';
import { UserStateContext } from '../contexts/UserContext';

function useUserState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

export default useUserState;
