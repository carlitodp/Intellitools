interface Props {
  headers: string[];
  listItems: string[];
}

function CustomedTable({ headers, listItems }: Props) {
  return (
    <>
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="table table-success table-hover table-bordered">
          <thead>
            <tr>
              {headers.map((header) => (
                <th scope="col" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {listItems.map((item) => (
              <tr key={item}>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CustomedTable;
