import { RequireAuth } from './pages/login/RequireAuth';
import Login from './pages/login/Login';
import HOME from './pages/home/home';
import TALK from './pages/talk/talk';
import TOP from './pages/top/toppage';
import TOROPHY from './pages/torophy/torophy';

import "@aws-amplify/ui-react/styles.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import { Authenticator } from "@aws-amplify/ui-react";
Amplify.configure(config);


function Myroutes(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<TOP />}/>
        <Route path='/home' element = {
          <RequireAuth>
            <HOME context/>
          </RequireAuth>
        } />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/talk' element = {<TALK />} />
        <Route path = '/torophy' element = {<TOROPHY />}/>
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <Authenticator.Provider>
      <Myroutes />
    </Authenticator.Provider>
  );
}

export default App;