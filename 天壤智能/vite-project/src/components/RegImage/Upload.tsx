const Upload = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <input
        id="upload"
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        multiple
        onChange={onChange}
      />
      <label className="uploadBtn" htmlFor="upload">
        Upload
      </label>
    </>
  );
};

export default Upload;
