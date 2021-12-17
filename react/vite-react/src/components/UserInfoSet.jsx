import { useContext, userState } from 'react';
import { UserContext } from '../context/index'

const reducer = (state, action) => {
  let { type, playload } = action;
  switch (type) {
    case 'UPDATE':
      return { ...state, ...playload };
  }
}

const connect = (Component) => {
  return () => {
    const { userState, setUserState } = useContext(UserContext);
    const dispatch = (action) => {
      setUserState(reducer(userState, action))
    }
    return <Component dispatch={dispatch}></Component>
  }
}

const UserInfo = ({ dispatch }) => {
  console.log('UserInfoSet.jsx render');
  const { userState } = useContext(UserContext);
  const onChange = (e) => {
    // setUserState({ ...userState, age: e.target.value })
    // setUserState(reducer(userState, { type: "UPDATE", playload: { age: e.target.value } }))
    dispatch({ type: "UPDATE", playload: { age: e.target.value } })
  }
  return <>
    <div> User Age :<input type="text" value={userState.age} onChange={onChange} /></div>
  </>
}

export default connect(UserInfo);