import './App.css'
import FirstChild from "./components/FirstChild"
import SecendChild from "./components/SecendChild"
import LastChild from "./components/LastChild"
import UserInfo from "./components/UserInfo"
import UserInfoSet from "./components/UserInfoSet"
import { Context } from './store/reducer'
import store from './store/index'

function App() {
  console.log('App.jsx render');
  return (
    <div className="App">
      <div className="child">App</div>

      <Context.Provider value={store}>
        <FirstChild></FirstChild>
        <SecendChild><UserInfo></UserInfo></SecendChild>
        <LastChild><UserInfoSet></UserInfoSet></LastChild>
      </Context.Provider>
    </div>
  )
}

export default App
