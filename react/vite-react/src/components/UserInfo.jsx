import { useContext } from 'react';
import { UserContext } from '../context/index'
const UserInfo = () => {
  console.log('UserInfo.jsx render');
  const { state } = useContext(UserContext);
  return <>
    <div>User Name:{state.user.name}</div>
    <div>User Age:{state.user.age}</div>
  </>
}
export default UserInfo;