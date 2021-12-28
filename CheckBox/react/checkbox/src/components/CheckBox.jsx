import { useState } from 'react';
const List = [
  { id: 1, ctx: 'ctx1', checked: false },
  { id: 2, ctx: 'ctx2', checked: false },
  { id: 3, ctx: 'ctx3', checked: false },
  { id: 4, ctx: 'ctx4', checked: false },
]
const CheckBox = () => {
  const [checkList, setCheckList] = useState([
    { id: 1, ctx: 'ctx1', checked: false },
    { id: 2, ctx: 'ctx2', checked: false },
    { id: 3, ctx: 'ctx3', checked: false },
    { id: 4, ctx: 'ctx4', checked: false },
  ])
  const [checkedList, setCheckedList] = useState([])
  const [checkedAll, setCheckedAll] = useState(false);
  const setItemChecked = (id, checked) => {
    console.log(id, checked)
    setCheckList(checkList.map(item => {
      if (item.id === id) item.checked = checked
      return item
    }))

  }
  const onchangeCheckedAll = (checked) => {
    setCheckedAll(checked)
    console.log(checkList.map(item => ({ ...item, checked })))
    setCheckList(checkList.map(item => ({ ...item, checked })))
  }


  return <>
    <span>全选</span><input type="checkbox" checked={checkedAll} onChange={e => onchangeCheckedAll(e.target.checked)} />
    {checkList.map((item, index) => {
      return <div key={item.id}>
        <span>{item.ctx}</span><input type="checkbox" checked={item.checked} onChange={e => setItemChecked(item.id, e.target.checked)} />
      </div>
    })}


  </>
}

export default CheckBox



