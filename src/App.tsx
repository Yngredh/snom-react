import React, { useState, createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './themes/theme';
import './index.css';
import { Login } from './pages/login';
import { TrainingPanel } from './pages/Training Panel';
import { IUserContext } from './interfaces/IUserContext';

function App() {
  const [userInfo, setUserInfo] = useState<IUserContext>({
    token: ''
  });
  const UserContext = createContext({});
  const storeAccessToken = (token: string) => {
    setUserInfo({ ...userInfo, token: token});
  }

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={userInfo}>
        <div className='app'>
          {/* <Menu></Menu> */}
          <Login onSucessufullyLogin={storeAccessToken} onFailureLogin={() => console.log("Falhou")}/>
        </div>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;