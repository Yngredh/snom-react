import './index.css';
import { theme } from './themes/theme';
import { useState, createContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { IUserContext } from './interfaces/IUserContext';
import { Router } from './Router';
import { Login } from './pages/Login';
import { UserService } from './services/UserService';
import { IUser } from './interfaces/IUser';
import { ITrainingProgress } from './interfaces/ITrainingProgress';

export const UserContext = createContext<IUserContext>({
  token: '',
  user: {}
});

export const TrainingProgressContext = createContext<
  ({trainingProgress: Partial<ITrainingProgress> | undefined, setTrainingProgressContext: (trainingProgress :Partial<ITrainingProgress>) => void})>
  ({trainingProgress: {}, setTrainingProgressContext: (trainingProgress :Partial<ITrainingProgress>) => {}});

function App(): JSX.Element {
  const [userToken, setUserToken] = useState<string>('');
  const [userData, setUserData] = useState<IUser>();
  const [trainingProgressData, setTrainingProgressData] = useState<Partial<ITrainingProgress>>();

  const handleSetTrainingProgress = (trainingProgress : Partial<ITrainingProgress>) => {
    setTrainingProgressData(trainingProgress);
  }

  const storeAccessToken = async (token: string) => {
    setUserToken(token);
    localStorage.setItem('authToken', token);
  }

  useEffect(() => {
    const localToken = localStorage.getItem('authToken');
    if(localToken && localToken !== 'undefined' && localToken !== userToken) {
      setUserToken(localToken);
    }

    const getUserData = async () => {
      if(userToken !== '') {
        const user = await UserService.getUserByToken(userToken);
        setUserData(user);
      }
    }

    getUserData();
  }, [userToken])

  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
        <UserContext.Provider value={{ token: userToken, user: userData }}>
            <TrainingProgressContext.Provider value={{trainingProgress: trainingProgressData, setTrainingProgressContext: handleSetTrainingProgress}}>
              <BrowserRouter>
                {!userToken ?
                  <Login onSucessufullyLogin={storeAccessToken} onFailureLogin={() => console.log("Falhou")}/>
                  : <Router />
                }
              </BrowserRouter>
            </TrainingProgressContext.Provider>
        </UserContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;