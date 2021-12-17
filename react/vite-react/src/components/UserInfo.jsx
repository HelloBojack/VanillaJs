import { useContext } from 'react';
import { UserContext } from '../context/index'
const UserInfo = () => {
  console.log('UserInfo.jsx render');
  const { userState } = useContext(UserContext);
  return <>
    <div>User Name:{userState.name}</div>
    <div>User Age:{userState.age}</div>
  </>
}
export default UserInfo;