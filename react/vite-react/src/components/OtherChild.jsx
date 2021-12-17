const OtherChild = ({ children }) => {
  console.log('OtherChild.jsx render');
  return <div className='child'>
    Other Child
    {children}
  </div>
}
export default OtherChild;