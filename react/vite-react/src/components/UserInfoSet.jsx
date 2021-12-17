import { useContext, userState } from 'react';
import { UserContext } from '../context/index'
import { connect } from '../store/index'


const UserInfo = ({ dispatch }) => {
  console.log('UserInfoSet.jsx render');
  const { state } = useContext(UserContext);
  const onChange = (e) => {
    // setUserState({ ...userState, age: e.target.value })
    // setUserState(reducer(userState, { type: "UPDATE", playload: { age: e.target.value } }))
    dispatch({ type: "UPDATE", playload: { age: e.target.value } })
  }
  return <>
    <div> User Age :<input type="text" value={state.user.age} onChange={onChange} /></div>
  </>
}

export default connect(UserInfo);