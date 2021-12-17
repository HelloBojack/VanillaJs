import { connect } from '../store/index'
const FirstChild = ({ group }) => {
  console.log('FirstChild.jsx render');
  return <div className='child'>
    First Child
    <div>{group}</div>
  </div>
}
export default connect(state => ({ group: state.group }))(FirstChild);