import { useContext, userState } from 'react';
import { UserContext } from '../context/index'
const UserInfo = () => {
  console.log('UserInfoSet.jsx render');
  const { userState, setUserState } = useContext(UserContext);
  const onChange = (e) => {
    setUserState({ ...userState, age: e.target.value })
  }
  return <>
    <div> User Age :<input type="text" value={userState.age} onChange={onChange} /></div>
  </>
}
export default UserInfo;