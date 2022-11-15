import { useRef, useState } from "react";
import "./App.css";
const INIT_ITEMS = [
  "🐳",
  "🍄",
  "",
  "🥝",
  "",
  "❄️",
  "🦔",
  "",
  "🥇",
  "",
  "🚀",
  "",
];

function App() {
  const [items, setItems] = useState(INIT_ITEMS);
  const [dragItem, setDragItem] = useState<number | null>();
  const [targetItem, setTargetItem] = useState<number | null>();

  const onDragStart = (index: number) => (e: any) => {
    e.dataTransfer.effectAllowed = "move";
    setDragItem(index);
  };

  const onDragOver = (index: number) => (e: any) => {
    e.preventDefault();

    setTargetItem(index);
  };

  const onDragLeave = () => (e: any) => {
    e.preventDefault();
    setTargetItem(null);
  };

  const onDrop = () => {
    console.log(dragItem, targetItem);

    if (dragItem && targetItem) {
      console.log(123);

      let tempItem = [...items];
      [tempItem[dragItem], tempItem[targetItem]] = [
        tempItem[targetItem],
        tempItem[dragItem],
      ];
      setItems(tempItem);
    }
    setTargetItem(null);
    setDragItem(null);
  };

  const onDragEnd = () => {
    setTargetItem(null);
    setDragItem(null);
  };

  return (
    <div className="Wrapper">
      {items.map((item, index) => (
        <div
          className={`placeholder ${targetItem == index ? "target" : ""}`}
          key={item + index}
        >
          <div
            className={`item ${dragItem == index ? "dragItem" : ""}`}
            draggable={true}
            onDragStart={onDragStart(index)}
            onDragOver={onDragOver(index)}
            onDragLeave={onDragLeave}
            onDrop={() => onDrop()}
            onDragEnd={onDragEnd}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
