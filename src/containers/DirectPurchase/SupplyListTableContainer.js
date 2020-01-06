import React from "react";

import MaterialReactTable from "components/Table/MaterialReactTable";
import CustomButton from "components/CustomButtons/Button";

import classNames from "classnames";

// sample Data Import

export default function SupplyListTable(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "샵",
        accessor: "supply_shop"
      },
      {
        // Task 하나.
        Header: "세부",
        accessor: "supply_detail_shop"
      },
      {
        Header: "국가",
        accessor: "country"
      },
      {
        Header: "도시",
        accessor: "city"
      },
      {
        header: "url",
        accessor: "shop_url"
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
        Header: "최근업데이트",
        accessor: "last_operate"
      },
      {
        Header: "액션",
        accessor: d => [d.shop_id, d.task_id, d.robot_id],
        Cell: d => {
          console.log("---Action Cell");
          console.log(d);
          return <div>action</div>;
        }
      }
    ],
    []
  );
  const data = [
    {
      supply_shop: "younsoo",
      supply_detail_shop: "shin",
      age: "10",
      visits: "10",
      status: "debug",
      progress: "starting"
    }
  ];

  const [usedData, setData] = React.useState(data);

  return (
    <div>
      {/* <div onClick={e => changeCheckbox(!hasCheckbox)}>체크박스삭제</div> */}
      <CustomButton color="primary" size="lg" simple block>
        as
      </CustomButton>
      <MaterialReactTable
        data={usedData}
        columns={columns}
        hasCheckbox={true}
        className={classNames("-striped", "-highlight")}
        debug={true}
      />
    </div>
  );
}
