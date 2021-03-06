import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Menu } from './components/Menu/index';
import { theme } from './themes/theme';
import './index.css';
import { ManageEmployees } from './pages/manageEmployees';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
        <Menu></Menu>
        <ManageEmployees/>
      </div>
    </ThemeProvider>
  );
}

export default App;
