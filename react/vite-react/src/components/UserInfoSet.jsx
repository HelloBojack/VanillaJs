import { connect } from '../store/index'

const UserInfo = ({ user, dispatch }) => {
  console.log('UserInfoSet.jsx render');
  const onChange = (e) => dispatch({ type: "UPDATE_USER", playload: { age: e.target.value } })
  // setUserState({ ...userState, age: e.target.value })
  // setUserState(reducer(userState, { type: "UPDATE", playload: { age: e.target.value } }))
  return <>
    <div> User Age :<input type="text" value={user.age} onChange={onChange} /></div>
  </>
}

export default connect(state => { return { user: state.user } })(UserInfo);