import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

export function useCheckbox(tableHooks) {
  tableHooks.flatColumns.push(columns => [
    {
      id: "selection",
      Header: ({ getToggleAllRowsSelectedProps, ...restTableData }) => {
        return (
          <div>
            {/* Header Checkbox */}
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          </div>
        );
      },
      Cell: ({ row, ...restCellData }) => {
        return (
          <div>
            {/* Row Checkbox */}
            <Checkbox {...row.getToggleRowSelectedProps()} key={row.id} />
          </div>
        );
      }
    },
    ...columns
  ]);
}
