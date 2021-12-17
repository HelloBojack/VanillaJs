import { connect } from '../store/reducer'
const fetchUser = (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.json())
    .then(res => {
      dispatch({ type: 'UPDATE_USER', playload: { name: res.name } })
    })
}
const UserInfoAsyncSet = ({ dispatch }) => {
  console.log('UserInfoAsyncSet.jsx render');

  const onClick = () => {
    // fetchUser(updateUser)
    dispatch(fetchUser)
    // const { name } = await fetch('https://jsonplaceholder.typicode.com/users/1')
    //   .then(res => res.json())
    // updateUser({ name })
  }
  // const onChange = (e) => updateUser({ age: e.target.value })
  // setUserState({ ...userState, age: e.target.value })
  // setUserState(reducer(userState, { type: "UPDATE", playload: { age: e.target.value } }))
  return <>
    <div><button onClick={onClick}>Async</button></div>
  </>
}

export default connect()(UserInfoAsyncSet);