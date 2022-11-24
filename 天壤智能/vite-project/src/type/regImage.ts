export interface IRegImage {
  src: string;
  name?: string;
  err?: string;
}
export interface IState {
  status: RegImageStatus;
  src: Promise<IRegImage> | string;
  key: string;
}
export enum RegImageStatus {
  success = "success",
  fail = "fail",
  loading = "loading",
  hidden = "hidden",
}
