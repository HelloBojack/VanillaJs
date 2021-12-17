import { connectToUser } from '../store/connects/connectToUser'

const UserInfo = ({ user, updateUser }) => {
  console.log('UserInfoSet.jsx render');
  const onChange = (e) => updateUser({ age: e.target.value })
  // setUserState({ ...userState, age: e.target.value })
  // setUserState(reducer(userState, { type: "UPDATE", playload: { age: e.target.value } }))
  return <>
    <div> User Age :<input type="text" value={user.age} onChange={onChange} /></div>
  </>
}

export default connectToUser(UserInfo);