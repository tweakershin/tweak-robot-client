import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames/bind";

/** material-ui **/
import { makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Checkbox from "@material-ui/core/Checkbox";

/** react-table **/
import {
  // The primary React Table hook
  useTable,
  // Core Plugin Hooks
  useGroupBy,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useExpanded,
  usePagination,
  // useTokenPagination ,
  useRowSelect,
  useRowState,
  useColumnOrder,

  // useBlockLayout
  useBlockLayout,
  useAbsoluteLayout,
  useFlexLayout,
  useResizeColumns
} from "react-table";

/** My-Component **/
import MaterialReactTableHead from "./MaterialReactTableHead";
import MaterialReactTableBody from "./MaterialReactTableBody";
import MaterialReactTableRow from "./MaterialReactTableRow";
import MaterialReactTableCell from "./MaterialReactTableCell";

import { useCheckbox, useRowClickable } from "./hooks";

export default function MaterialReactTable(props) {
  const { data, columns, hasCheckbox, debug, rowOptions } = props;
  const checkboxHook = React.useMemo(() => {
    // TODO: checkbox 동적으로 생성 만들기
    if (hasCheckbox) {
      return useCheckbox;
    } else {
      return () => {};
    }
  }, [hasCheckbox]);

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,

    ...restTableProps
  } = useTable(
    {
      columns,
      data,
      debug,
      rowOptions
    },
    // Core Plugin Hooks
    useGroupBy,
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useRowState,
    useColumnOrder,
    // Layout Hooks
    // useBlockLayout,
    // useAbsoluteLayout,
    // useFlexLayout,
    // useResizeColumns,
    //  Custom Hook
    checkboxHook,
    useRowClickable
  );

  // console.log(pageIndex, pageSize, groupBy, expanded, filters, selectedRowIds);
  return (
    <TableContainer {...getTableProps()}>
      <Table>
        <MaterialReactTableHead columns={columns} headerGroups={headerGroups} />
        <MaterialReactTableBody
          prepareRow={prepareRow}
          rows={rows}
          rowOptions={rowOptions}
        />
      </Table>
    </TableContainer>
  );
}

MaterialReactTable.propTypes = {
  // core
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  // plugins

  // style
  hasCheckbox: PropTypes.bool,
  // debug
  debug: PropTypes.bool,
  rowOptions: PropTypes.object
};

MaterialReactTable.defaultProps = {
  // plugins
  // style
  hasCheckbox: false,
  // debug
  debug: false,
  rowOptions: {
    clickable: false,
    onClick: () => {}
  }
};

// export default function ReactTable({
//   columns,
//   data,
//   initialState,
//   debug,
//   className
// }) {
//   const instance = useTable({
//     columns,
//     data
//   });

//   console.log(instance);
//   console.log(className);

//   return (
//     <div className={classNames("ReactTable", className)}>
//       <div className="rt-table" role="grid"></div>
//     </div>
//   );
// }

// // https://github.com/tannerlinsley/react-table/blob/master/docs/api/useTable.md
// ReactTable.propTypes = {
//   columns: PropTypes.array.isRequired,
//   data: PropTypes.array.isRequired,
//   initialState: PropTypes.object,
//   debug: PropTypes.bool,
//   className: PropTypes.string
// };
