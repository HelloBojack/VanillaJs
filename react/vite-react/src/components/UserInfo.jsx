import { connectToUser } from '../store/connects/connectToUser'

const UserInfo = ({ user }) => {
  console.log('UserInfo.jsx render');
  return <>
    <div>User Name:{user.name}</div>
    <div>User Age:{user.age}</div>
  </>
}
export default connectToUser(UserInfo);