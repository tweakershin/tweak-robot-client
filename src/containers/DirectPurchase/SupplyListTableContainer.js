import React from "react";
import PropTypes from "prop-types";

import MaterialReactTable from "components/Table/MaterialReactTable";

import classNames from "classnames";

import { getSupplyShopList } from "services/directPurchase/supply";

// sample Data Import

export default function SupplyListTableContainer(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "그룹",
        accessor: d => {
          if (d.group !== null && d.group !== undefined) {
            return [d.group.name];
          } else {
            return null;
          }
        }
      },
      {
        Header: "샵",
        accessor: "name"
      },
      {
        // Task 하나.
        Header: "세부",
        accessor: "detail"
      },
      {
        Header: "url",
        accessor: "url"
      },
      {
        Header: "국가",
        accessor: d => {
          if (d.country !== null && d.country !== undefined) {
            return [d.country.continent.name, d.country.name];
          }
          return null;
        }
      },
      {
        Header: "도시",
        accessor: d => {
          if (d.subdivision !== null && d.subdivision !== undefined) {
            return [d.code, d.subdivision.name];
          }
          return null;
        }
      },

      {
        Header: "상태",
        accessor: "robot_status"
      },
      {
        Header: "주기",
        accessor: "robot_period"
      },
      {
        Header: "액션",
        accessor: d => [d.name, d.detail, d.url],
        Cell: d => {
          console.log("---Action Cell");
          console.log(d);
          return <div>a</div>;
        }
      }
    ],
    []
  );
  const [shopListData, setShopListData] = React.useState([]);

  const makeShopToTableData = React.useCallback(shopListData => {
    // shopListData.
    setShopListData(shopListData);
  }, []);
  React.useEffect(() => {
    getSupplyShopList().then(shopListData => {
      makeShopToTableData(shopListData);
    });
  }, []);

  return (
    <div>
      {/* <div onClick={e => changeCheckbox(!hasCheckbox)}>체크박스삭제</div> */}

      <MaterialReactTable
        data={shopListData}
        columns={columns}
        hasCheckbox={true}
        className={classNames("-striped", "-highlight")}
        debug={true}
      />
    </div>
  );
}

SupplyListTableContainer.propTypes = {
  history: PropTypes.object
};
