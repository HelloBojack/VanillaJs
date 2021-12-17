import { createReducer } from "./reducer"

const initialState = {
  user: { name: 'Bojack', age: 24 },
  group: 'Frondend'
}

const reducer = (state, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...payload } };
  }
}

const store = createReducer(initialState, reducer)

export default store