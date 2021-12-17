import { useContext } from 'react';
import { UserContext } from '../context/index'
import { connect } from '../store/index'
const UserInfo = ({ state }) => {
  console.log('UserInfo.jsx render');
  return <>
    <div>User Name:{state.user.name}</div>
    <div>User Age:{state.user.age}</div>
  </>
}
export default connect(UserInfo);