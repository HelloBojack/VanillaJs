const LastChild = ({ children }) => {
  console.log('LastChild.jsx render');
  return <div className='child'>
    Last Child
    {children}
  </div>
}
export default LastChild;