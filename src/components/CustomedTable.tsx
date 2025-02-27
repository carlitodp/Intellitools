import { RectangleData } from "./Canva";

interface Props {
  headers: string[];
  listItems?: string[] | RectangleData[];
  onClickFc:(item:string | RectangleData )=>void;
}

function CustomedTable({ headers, listItems, onClickFc}: Props) {
  return (
    <>
      <div style={{ maxHeight: "250px", maxWidth:"250px", overflowY: "auto", overflowX: "auto" }}>
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
            {listItems && listItems.map((item, index) => (
              <tr key={index} onClick={() => onClickFc(item)} >
                <td> {typeof item === 'string'  ? item : `(${item.x.toFixed(3)}, ${item.y.toFixed(3)}) ${item.width}x${item.height} ${item.class_}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CustomedTable;
