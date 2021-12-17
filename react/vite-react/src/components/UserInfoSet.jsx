import { connect } from '../store/index'

const UserInfo = ({ state, dispatch }) => {
  console.log('UserInfoSet.jsx render');
  const onChange = (e) => dispatch({ type: "UPDATE_USER", playload: { age: e.target.value } })
  // setUserState({ ...userState, age: e.target.value })
  // setUserState(reducer(userState, { type: "UPDATE", playload: { age: e.target.value } }))
  return <>
    <div> User Age :<input type="text" value={state.user.age} onChange={onChange} /></div>
  </>
}

export default connect(UserInfo);