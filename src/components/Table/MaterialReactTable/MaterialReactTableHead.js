import React from "react";
// PropTypes
import PropTypes from "prop-types";

// Material-UI
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function MaterialReactTableHead(props) {
  const {
    // core
    columns,
    headerGroups,
    // style
    isCheckbox
    // header,
    // classes,
    // onSelectAllClick,
    // order,
    // orderBy,
    // numSelected,
    // rowCount,
    // onRequestSort
  } = props;

  // const createSortHandler = property => event => {
  //   onRequestSort(event, property);
  // };
  return (
    // {isCheckbox ? (
    //       <TableCell padding="checkbox">
    //         <Checkbox
    //           indeterminate={
    //             false
    //             // numSelected > 0 && numSelected < rowCount
    //           }
    //           checked={
    //             false
    //             // numSelected === rowCount
    //           }
    //           onChange={
    //             () => true
    //             // onSelectAllClick
    //           }
    //           inputProps={{ "aria-label": "select all desserts" }}
    //         />
    //       </TableCell>
    //     ) : null}
    <TableHead>
      {headerGroups.map((headerGroup, idx) => {
        {
          /* console.log(headerGroup.getHeaderGroupProps()); */
        }
        return (
          <TableRow {...headerGroup.getHeaderGroupProps()} key={idx}>
            {headerGroup.headers.map(column => {
              return (
                <TableCell
                  key={column.id}
                  align={column.align}
                  padding={column.disablePadding ? "none" : "default"}
                  sortDirection={""}
                  {...column.getHeaderProps()}
                >
                  <TableSortLabel
                  // active={orderBy === headCell.id}
                  // direction={order}
                  // onClick={createSortHandler(headCell.id)}
                  >
                    {column.render("Header")}
                  </TableSortLabel>
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}

      {/* <TableRow>
        {columns.map(column => {
          return (
            <TableCell
              key={column.id}
              align={column.align}
              padding={column.disablePadding ? "none" : "default"}
              // sortDirection={headCell.}
            >
              <TableSortLabel
              //   active={orderBy === headCell.id}
              // direction={order}
              // onClick={createSortHandler(headCell.id)}
              >
                {column.name}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow> */}
      {/* <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {header.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow> */}
    </TableHead>
  );
}

MaterialReactTableHead.propTypes = {
  // Core
  columns: PropTypes.array.isRequired,
  headerGroups: PropTypes.array.isRequired,
  // Style
  isCheckbox: PropTypes.bool
  // header: PropTypes.array,
  // classes: PropTypes.object,
  // onSelectAllClick: PropTypes.func,
  // order: PropTypes.string
  // numSelected,
  // rowCount,
  // onRequestSort
};

MaterialReactTableHead.defaultProps = {
  // Core
  columns: [],
  headerGroups: [],
  // Style
  isCheckbox: true
};
