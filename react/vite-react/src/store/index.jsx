import { useContext, useEffect, useState, createContext } from 'react'

export const Context = createContext(null)

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
    group: 'Frondend'
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
const isChanged = (oldState, newState) => {
  let flag = false;
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      flag = true;
      break;
    }
  }
  return flag
}
export const connect = (selector) => (Component) => {
  return (props) => {
    const [_, update] = useState({});
    const { state, setState, subscribe } = useContext(Context);
    const data = selector ? selector(state) : { state };

    useEffect(() => subscribe(() => {
      const newData = selector ? selector(store.state) : { state: store.state };
      if (isChanged(data, newData)) {
        update({})
      }
    }), [selector])

    const dispatch = (action) => {
      setState(reducer(state, action))
    }

    return <Component dispatch={dispatch} {...data} {...props} />
  }
}
