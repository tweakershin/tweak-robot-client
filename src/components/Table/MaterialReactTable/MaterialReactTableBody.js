import React from "react";

import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default function MaterialReactTableBody(props) {
  const { rows, prepareRow } = props;
  return (
    <TableBody>
      {rows.map((row, i) => {
        prepareRow(row);
        return (
          <TableRow {...row.getRowProps()}>
            {row.cells.map(cell => {
              return (
                <TableCell {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}