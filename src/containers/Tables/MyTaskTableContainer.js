import React from "react";
import ReactTable from "react-table";
import { generateTaskMock } from "variables/mock";

import FolderIcon from "@material-ui/icons/Folder";
import AndroidIcon from "@material-ui/icons/Android";

export default function MyTaskTableContainer(props) {
  const data = generateTaskMock();

  const columns = [
    {
      Header: "이름",
      id: "type_name",
      accessor: d => [d.type, d.name],
      Cell: cellInfo => {
        const [type, name] = cellInfo.row.type_name;
        let TypeIcon;

        if (type === "collection") {
          TypeIcon = FolderIcon;
        } else if (type === "task") {
          TypeIcon = AndroidIcon;
        }
        return (
          <div style={{ cursor: "default" }}>
            <TypeIcon /> {name}
          </div>
        );
      }
    },
    {
      Header: "소유자",
      accessor: "author"
    }
  ];

  const [selectedRow, changeSelectedRow] = React.useState([]);
  return (
    <div>
      <ReactTable
        data={data}
        columns={columns}
        getTrProps={(state, rowInfo) => {
          if (rowInfo && rowInfo.row) {
            return {
              onDoubleClick: e => {
                // cell Double Click Event
                e.stopPropagation();
                const { id, type, name } = rowInfo.original;
                console.log(id);
                console.log(state);
                console.log(rowInfo);
                if (type === "collection") {
                  alert(`collection 더블 클릭 ${name}`);
                } else if (type === "task") {
                  window.open(`/admin/my-tasks/task/${id}`, "_blank");
                }
              },
              onClick: e => {
                // cell Click Event
                e.stopPropagation();
                const { id, type, name } = rowInfo.original;
                console.log(rowInfo);
                if (type === "collection") {
                  console.log(`collection 클릭 ${name}`);
                } else if (type === "task") {
                  console.log(`task 클릭 ${name}`);
                }
              },
              onContextMenu: function(e) {
                // 마우스 우클릭시
                e.preventDefault();
                e.stopPropagation();
                // TODO: 드래그 하여 이동
                // TODO: !important 마우스 우클릭시 이동 탭 만들기
                const { id, type, name } = rowInfo.original;
                if (e.nativeEvent.which === 3) {
                  console.log("Right click");
                }
              }
            };
          }
          return {};
        }}
      />
    </div>
  );
}
