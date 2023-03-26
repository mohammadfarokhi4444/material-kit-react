import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
// routes
import Router from './routers';
// theme
import ThemeProvider from './theme';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </UserProvider>
  );
}
