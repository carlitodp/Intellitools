interface Props {
  input: string;
  choices: string[];
}

function DropDownButton({ input, choices }: Props) {
  return (
    <>
      <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {input}
        </button>
        <ul className="dropdown-menu">
          {choices.map((choice) => (
            <li className="dropdown-item" key={choice}>
              {choice}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DropDownButton;
