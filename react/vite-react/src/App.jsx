import './App.css'
import FirstChild from "./components/FirstChild"
import SecendChild from "./components/SecendChild"
import LastChild from "./components/LastChild"
import UserInfo from "./components/UserInfo"
import UserInfoSet from "./components/UserInfoSet"
import { UserContext } from './context/index'
import { useState } from 'react';

function App() {
  console.log('App.jsx render');

  const [userState, setUserState] = useState({ name: 'Bojack', age: '24' });

  return (
    <div className="App">
      <div className="child">App</div>

      <UserContext.Provider value={{ userState, setUserState }}>
        <FirstChild></FirstChild>
        <SecendChild><UserInfo></UserInfo></SecendChild>
        <LastChild><UserInfoSet></UserInfoSet></LastChild>
      </UserContext.Provider>
    </div>
  )
}

export default App
