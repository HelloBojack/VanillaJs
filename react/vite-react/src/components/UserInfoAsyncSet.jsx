import { connect } from '../store/reducer'
const fetchUser = (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.json())
    .then(res => {
      dispatch({ type: 'UPDATE_USER', payload: { name: res.name } })
    })
}
const UserInfoAsyncSet = ({ dispatch }) => {
  console.log('UserInfoAsyncSet.jsx render');
  const onClick1 = () => {
    dispatch(fetchUser)
  }
  const onClick2 = () => {

    // fetchUser(updateUser)
    // dispatch(fetchUser)

    dispatch({
      type: 'UPDATE_USER', payload: fetch('https://jsonplaceholder.typicode.com/users/1').then(res => res.json()).then(res => res)
    })



    // const { name } = await fetch('https://jsonplaceholder.typicode.com/users/1')
    //   .then(res => res.json())
    // updateUser({ name })
  }
  // const onChange = (e) => updateUser({ age: e.target.value })
  // setUserState({ ...userState, age: e.target.value })
  // setUserState(reducer(userState, { type: "UPDATE", payload: { age: e.target.value } }))
  return <>
    <div><button onClick={onClick1}>Async1</button></div>
    <div><button onClick={onClick2}>Async2</button></div>
  </>
}

export default connect()(UserInfoAsyncSet);