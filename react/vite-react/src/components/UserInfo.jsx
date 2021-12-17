import { connect } from '../store/index'
const UserInfo = ({ user }) => {
  console.log('UserInfo.jsx render');
  return <>
    <div>User Name:{user.name}</div>
    <div>User Age:{user.age}</div>
  </>
}
export default connect(state => ({ user: state.user }))(UserInfo);