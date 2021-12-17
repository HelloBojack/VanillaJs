import { connect } from "../reducer"

const userSelector = state => ({ user: state.user })
const userDispatcher = dispatch => ({ updateUser: payload => dispatch({ type: "UPDATE_USER", payload }) })

export const connectToUser = connect(userSelector, userDispatcher)
