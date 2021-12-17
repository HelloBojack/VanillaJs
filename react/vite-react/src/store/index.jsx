import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/index'
const reducer = (state, action) => {
  let { type, playload } = action;
  switch (type) {
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...playload } };
  }
}
export const store = {
  state: {
    user: { name: 'Bojack', age: 24 },
  },
  setState(newState) {
    store.state = newState
    store.listeners.map(listener => listener(store.state))
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => {
      const index = store.listeners.indexOf(fn)
      store.listeners.splice(index, 1)
    }
  },
}
export const connect = (Component) => {
  return (props) => {
    const [_, update] = useState({});
    const { state, setState, subscribe } = useContext(UserContext);
    useEffect(() => {
      subscribe(update);
    }, [])
    const dispatch = (action) => {
      setState(reducer(state, action))
      // update({});
    }
    return <Component dispatch={dispatch} state={state} {...props} />
  }
}
