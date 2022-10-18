import './App.css';
import {createTheme} from '@mui/material';
import {ThemeProvider} from '@mui/styles';
import ContactForm from "./components/ContactForm/ContactForm";

function App() {
    const theme = createTheme()
      return (
          <ThemeProvider theme={theme}>
            <div className="App">
              <ContactForm/>
            </div>
          </ThemeProvider>
      );
}

export default App;
