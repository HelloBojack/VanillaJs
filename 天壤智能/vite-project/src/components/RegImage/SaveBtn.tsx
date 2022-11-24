import { IState, RegImageStatus } from "../../type/regImage";

const SavaBtn = ({ disabled }: { disabled: boolean }) => {
  return (
    <button
      className="savaBtn"
      disabled={disabled}
      onClick={() => console.log("saving")}
    >
      Save
    </button>
  );
};

export default SavaBtn;
