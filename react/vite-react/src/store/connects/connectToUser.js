import { connect } from "../reducer"

const userSelector = state => ({ user: state.user })
const userDispatcher = dispatch => ({ updateUser: playload => dispatch({ type: "UPDATE_USER", playload }) })

export const connectToUser = connect(userSelector, userDispatcher)
