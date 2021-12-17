import './App.css'
import FirstChild from "./components/FirstChild"
import SecendChild from "./components/SecendChild"
import LastChild from "./components/LastChild"
import OtherChild from "./components/OtherChild"
import UserInfo from "./components/UserInfo"
import UserInfoSet from "./components/UserInfoSet"
import UserInfoAsyncSet from "./components/UserInfoAsyncSet"
import { Provider } from './store/reducer'
import store from './store/index'

function App() {
  console.log('App.jsx render');
  return (
    <div className="App">
      <div className="child">App</div>

      <Provider store={store}>
        <FirstChild></FirstChild>
        <SecendChild><UserInfo></UserInfo></SecendChild>
        <LastChild><UserInfoSet></UserInfoSet></LastChild>
        <OtherChild><UserInfoAsyncSet></UserInfoAsyncSet></OtherChild>
      </Provider>
    </div>
  )
}

export default App
