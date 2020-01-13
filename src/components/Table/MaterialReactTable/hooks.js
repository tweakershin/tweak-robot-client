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

export const useRowClickable = hooks => {
  hooks.getRowProps.push((props, { instance, row }) => {
    if (instance.rowOptions !== null && instance.rowOptions !== undefined) {
      if (
        instance.rowOptions.clickable !== null &&
        instance.rowOptions.clickable !== undefined &&
        instance.rowOptions.clickable
      ) {
        return [
          props,
          {
            clickable: instance.rowOptions.clickable,
            onClick: instance.rowOptions.onClick
          }
        ];
      }
    }
  });

  // hooks.getRowProps.push((props, { instance, row }) => {
  //   return "ABSC";
  // });
};

// TODO: hook 만들어서 rowProps에 onClick 등 추가해야함.

// export const useBlockLayout = hooks => {
//   hooks.getRowProps.push(getRowStyles);
//   hooks.getHeaderGroupProps.push(getRowStyles);

//   hooks.getHeaderProps.push((props, { column }) => [
//     props,
//     {
//       style: {
//         ...cellStyles,
//         width: `${column.totalWidth}px`
//       }
//     }
//   ]);

//   hooks.getCellProps.push((props, { cell }) => [
//     props,
//     {
//       style: {
//         ...cellStyles,
//         width: `${cell.column.totalWidth}px`
//       }
//     }
//   ]);
// };
