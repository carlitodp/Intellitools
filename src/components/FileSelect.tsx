interface Props {
  children: string;
  onChangeFC: (e: React.ChangeEvent<HTMLInputElement>) => void;
  acceptedFormat: string;
}

function FileSelect({ children, onChangeFC, acceptedFormat }: Props) {
  return (
    <>
      <div>
        <label htmlFor="customFile" className="form-label">
          {children}
        </label>
        <input type="file" className="form-control form-control-sm" id="customFile" accept={acceptedFormat} {...{ webkitdirectory: "true" }} onChange={onChangeFC} />
      </div>
    </>
  );
}

export default FileSelect;
