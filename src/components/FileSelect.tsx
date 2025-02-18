interface Props {
  children: string;
  onChangeFC: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FileSelect({ children, onChangeFC }: Props) {
  return (
    <>
      <div>
        <label htmlFor="customFile" className="form-label">
          {children}
        </label>
        <input type="file" className="form-control form-control-sm" id="customFile" {...{ webkitdirectory: "true" }} onChange={onChangeFC} />
      </div>
    </>
  );
}

export default FileSelect;
