const SecendChild = ({ children }) => {
  console.log('SecendChild.jsx render');
  return <div className='child'>
    Secend Child
    {children}
  </div>
}
export default SecendChild;