import { IState, RegImageStatus } from "../../type/regImage";

const ImageList = ({
  list,
  setBigImg,
  deleteItem,
}: {
  list: IState[];
  setBigImg: React.Dispatch<React.SetStateAction<string | undefined>>;
  deleteItem: (index: number) => void;
}) => {
  return (
    <div className="imgList">
      {list.map(
        (item: any, index: number) =>
          item.status != RegImageStatus.hidden && (
            <div key={item.key}>
              {item.status == RegImageStatus.loading && (
                <div className="loading">loading</div>
              )}
              {item.status == RegImageStatus.fail && (
                <div
                  className="loading"
                  style={{ color: "red" }}
                  onClick={() => alert(item.err)}
                >
                  Error
                </div>
              )}
              <img src={item.src} onClick={() => setBigImg(item.src)} />
              <span className="delete" onClick={() => deleteItem(index)}>
                X
              </span>
              {item.name && <span className="name">{item.name}</span>}
            </div>
          )
      )}
    </div>
  );
};

export default ImageList;
