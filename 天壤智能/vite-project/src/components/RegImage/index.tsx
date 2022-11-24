import { useRef, useState } from "react";
import { regImg, uploadImage } from "../../api/regImage";
import { IRegImage, IState, RegImageStatus } from "../../type/regImage";
import ImageList from "./ImageList";
import Upload from "./Upload";
import SavaBtn from "./SaveBtn";

const Index = () => {
  const [bigImg, setBigImg] = useState<string>();
  const [list, setList] = useState<IState[]>([]);
  const reflist = useRef<IState[]>();

  function handleRegImg(regImgList: IState[]) {
    regImgList.forEach((item, index) => {
      (item.src as Promise<IRegImage>)
        .then((res: IRegImage) => {
          let temp = {
            ...res,
            status: RegImageStatus.success,
            key: item.key,
          };
          let tempList = reflist.current ?? [];
          tempList[index] = temp;
          reflist.current = tempList;
          setList(tempList.slice());
        })
        .catch((err: IRegImage) => {
          let temp = {
            ...err,
            status: RegImageStatus.fail,
            key: item.key,
          };

          if (err.err == "错误") {
            let tempList = reflist.current ?? [];
            tempList[index] = temp;
            reflist.current = tempList;
            setList(tempList.slice());
          }
        });
    });
  }

  const handlePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imgList = await uploadImage();
    const regImgList = imgList.map((item) => regImg(item));
    const tempList = regImgList.map((item, index) => ({
      status: RegImageStatus.loading,
      src: item,
      key: imgList[index],
    }));

    reflist.current = tempList;
    setList(tempList);
    handleRegImg(tempList);
  };

  const deleteItem = (index: number) => {
    let tempList = reflist.current ?? [];
    tempList[index] = {
      ...tempList[index],
      status: RegImageStatus.hidden,
    };

    reflist.current = tempList;
    setList(tempList.slice());

    // @ts-ignore: Unreachable code error
    if (reflist.current[index].src.then) {
      // @ts-ignore: Unreachable code error
      reflist.current[index].src.abort({ err: "abort" });
    }
  };

  return (
    <>
      <div className="bigImg">
        <img src={bigImg} />
      </div>

      <div className="row">
        <Upload onChange={handlePictureChange} />
        <ImageList list={list} setBigImg={setBigImg} deleteItem={deleteItem} />
        <SavaBtn
          disabled={
            list.filter((item) => item.status != RegImageStatus.hidden).length <
              1 ||
            list.some(
              (item) =>
                item.status != RegImageStatus.hidden &&
                item.status != RegImageStatus.success
            )
          }
        />
      </div>
    </>
  );
};

export default Index;
