import { ThemeProvider } from '@mui/system';
import Switcher from 'components/Switcher';
import { AppProvider } from 'hooks/AppContext';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Switcher />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
