import { connect } from '../store/index'
const FirstChild = ({ state }) => {
  console.log('FirstChild.jsx render');
  console.log(state)
  return <div className='child'>
    First Child
    <div>{state.group}</div>
  </div>
}
export default connect()(FirstChild);