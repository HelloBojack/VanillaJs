import { useContext, useEffect, useState, createContext } from 'react'

const Context = createContext(null)

const setState = (newState) => {
  store.state = newState
  store.listeners.map(listener => listener(store.state))
}
let dispatch = (action) => {
  setState(store.reducer(store.state, action))
}
export const Provider = ({ store, children }) => {
  return <Context.Provider value={store}>
    {children}
  </Context.Provider >
}
export const createReducer = (initialState, reducer) => {
  store.state = initialState;
  store.reducer = reducer;
  return store
}

const store = {
  state: {},
  reducer: {},
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => {
      const index = store.listeners.indexOf(fn)
      store.listeners.splice(index, 1)
    }
  },
}

const preDispatch = dispatch
dispatch = (action) => {
  if (typeof action === 'function') {
    action(dispatch)
  } else {
    preDispatch(action)
  }
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

export const connect = (selector, dispatcher) => (Component) => {
  return (props) => {
    const { state, subscribe } = useContext(Context);

    const [_, update] = useState({});
    const data = selector ? selector(state) : { state };
    const dispatcherFn = dispatcher ? dispatcher(dispatch) : { dispatch };
    useEffect(() => subscribe(() => {
      const newData = selector ? selector(store.state) : { state: store.state };
      if (isChanged(data, newData)) {
        update({})
      }
    }), [selector])

    return <Component {...props}  {...data}  {...dispatcherFn} />
  }
}



