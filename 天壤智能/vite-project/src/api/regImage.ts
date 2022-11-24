import { IRegImage } from "../type/regImage";

export const uploadImage = (): Promise<string[]> => {
  return new Promise((res, rej) =>
    res([
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp2.cri.cn%2FM00%2FA9%2FB2%2FCqgNOliIAA-AXbZ2AAAAAAAAAAA781.928x523.jpg&refer=http%3A%2F%2Fp2.cri.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671781500&t=9b005eb86afdb4099e341b072e4c6bd4",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fworld.chinadaily.com.cn%2Fimg%2Fattachement%2Fjpg%2Fsite1%2F20170106%2Fa41f726b573a19d928d961.jpg&refer=http%3A%2F%2Fworld.chinadaily.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671783720&t=67c02775bc64827f2a3c29a1a6ac2af3",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp2.cri.cn%2FM00%2F56%2FA1%2FCqgNOlpRfvmAVEJhAAAAAAAAAAA480.4000x2667.jpg&refer=http%3A%2F%2Fp2.cri.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671783720&t=49d9410c469753405879f121d0c69b8f",
      "https://img1.baidu.com/it/u=3087594657,1782503777&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=400",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fphotocdn.sohu.com%2F20151217%2Fmp48987332_1450317604165_1_th.jpeg&refer=http%3A%2F%2Fphotocdn.sohu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671783693&t=d8bfdc36e2d1f9e78c8dda4ae30839fc",
      "https://img2.baidu.com/it/u=3655366376,2785379358&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=286",
      "https://img1.baidu.com/it/u=2479627140,1647908631&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=500",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-7.vcimg.com%2Fc2c91aef807c511c60ac134b4f2c8ddc37934%28600x%29%2Fthumb.jpg&refer=http%3A%2F%2Fi-7.vcimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671783693&t=29aeed9ee87b106f8aa951e509b76a99",
    ])
  );
};
export const regImg = (img: string) => {
  let abort;
  let p = new Promise<IRegImage>((res, rej) => {
    abort = rej;
    setTimeout(() => {
      if (Math.random() < 0.5) {
        res({
          src: img,
          name: "奥巴马",
        });
      } else {
        rej({
          src: img,
          err: "错误",
        });
      }
    }, Math.random() * 10000);
  });
  // @ts-ignore: Unreachable code error
  p.abort = abort;
  return p;
};
