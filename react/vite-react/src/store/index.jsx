import { useContext } from 'react'
import { UserContext } from '../context/index'
const reducer = (state, action) => {
  let { type, playload } = action;
  switch (type) {
    case 'UPDATE':
      return { ...state, ...playload };
  }
}
export const store = {
  state: {
    user: { name: 'Bojack', age: 24 },
  },
  setState(newState) {
    console.log(newState)
    store.state = newState
  }
}
export const connect = (Component) => {
  return (props) => {
    const { state, setState } = useContext(UserContext);
    const dispatch = (action) => {
      setState(reducer(state.user, action))
    }
    return <Component dispatch={dispatch} {...props} />
  }
}
