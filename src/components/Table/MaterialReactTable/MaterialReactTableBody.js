import React from "react";
import PropTypes from "prop-types";

import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MaterialReactTable from "./MaterialReactTable";

export default function MaterialReactTableBody(props) {
  const { rows, prepareRow } = props;

  return (
    <TableBody>
      {rows.map(row => {
        prepareRow(row);

        const { key, clickable, onClick, ...rowProps } = row.getRowProps();
        return (
          <TableRow
            {...rowProps}
            key={key}
            style={clickable ? { cursor: "pointer" } : {}}
            hover={clickable}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onClick(row);
            }}
          >
            {row.cells.map((cell, idx) => {
              const cellProps = cell.getCellProps();
              return (
                <TableCell key={cellProps.key} {...cellProps}>
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

MaterialReactTableBody.propTypes = {
  rows: PropTypes.array,
  prepareRow: PropTypes.func,
  rowOptions: PropTypes.object
};
