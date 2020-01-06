import React from "react";
import ReactTable from "react-table";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import Button from "components/CustomButtons/Button.js";

import JSONTree from "react-json-tree";
import _ from "lodash";
// mock data
import { generateMyRobotMock } from "variables/mock";

export default function MyRobotTableContainer(props) {
  const mockData = generateMyRobotMock(5, 3, 3);

  const tableData = mockData;

  const columns = [
    {
      Header: "Project",
      columns: [
        {
          Header: "이름",
          id: "name",
          accessor: d => d.project_name
        }
      ]
    },
    {
      Header: "로봇",
      columns: [
        {
          Header: "로봇 이름",
          id: "robotName",
          accessor: d => d.robot_name,
          aggregate: vals => {
            return `${vals.length} 개의 로봇`;
          }
        },
        // {
        //   Header: "설명",
        //   id: "robotDesc",
        //   accessor: d => d.robot_description,
        //   aggregate: vals => {
        //     console.log("----desc aggregate");
        //     console.log(vals);
        //     return {};
        //   }
        // },

        {
          Header: "태그",
          id: "tags",
          // maxWidth: 70,
          accessor: d => d.robot_tags,
          Cell: cellInfo => {
            return <div>{cellInfo.original.robot_tags.join(",")}</div>;
          },
          aggregate: vals => {
            const mergedTagArray = vals.reduce((prev, nxt) => {
              return prev.concat(nxt);
            });

            const tagsCount = mergedTagArray.reduce((prev, nxt) => {
              prev[nxt] = prev[nxt] + 1 || 1;
              return prev;
            }, {});

            return tagsCount;
          },
          Aggregated: row => {
            const tagsCount = row.value;
            return (
              <div>
                {Object.keys(tagsCount).map((key, index) => {
                  return (
                    <div key={index}>
                      {key}: {tagsCount[key]}
                    </div>
                  );
                })}
              </div>
            );
          }
        },
        {
          Header: "상태",
          id: "status",
          accessor: d => d.robot_status,
          // maxWidth: 70,
          sortable: false,
          aggregate: vals => {
            const statusCount = vals.reduce((prev, nxt) => {
              prev[nxt] = prev[nxt] + 1 || 1;
              return prev;
            }, {});
            return statusCount;
          },
          Aggregated: row => {
            const statusCount = row.value;
            return (
              <div>
                {Object.keys(statusCount).map((key, index) => {
                  return (
                    <div key={index}>
                      {key}: {statusCount[key]}
                    </div>
                  );
                })}
              </div>
            );
          }
        },
        {
          Header: "Actions",
          id: "actions",
          accessor: d => [d.project_id, d.robot_id],
          filterable: false,
          sortable: false,
          // maxWidth: 150,

          Cell: cellInfo => {
            // Aggregated X인 단일 CELL을 정의합니다.
            // console.log(cellInfo);
            const robotId = cellInfo.original.robot_id;
            return (
              <div className="actions-right">
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    // cellInfo.original.robot_id;
                    // cellInfo.original.project_id;
                    alert(`좋아요 클릭: ${robotId}를 클릭하셨습니다.`);
                  }}
                  color="info"
                  className="like"
                >
                  <Favorite />
                </Button>
                {/* use this button to add a edit kind of action */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    alert(`수정 클릭: ${robotId}를 클릭하셨습니다.`);
                  }}
                  color="warning"
                  className="edit"
                >
                  <Dvr />
                </Button>
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    alert(`삭제 클릭: ${robotId}를 클릭하셨습니다.`);
                  }}
                  color="danger"
                  className="remove"
                >
                  <Close />
                </Button>
              </div>
            );
          },

          aggregate: vals => {
            // return: projectId
            return vals[0][0];
          },
          Aggregated: row => {
            // aggreate에서 return 값이 value라는 key로 인자로 들어옴.
            const projectId = row.value;
            return (
              <div className="actions-right">
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    // cellInfo.original.robot_id;
                    // cellInfo.original.project_id;
                    alert(
                      `프로젝트 좋아요 클릭: ${projectId}를 클릭하셨습니다.`
                    );
                  }}
                  color="info"
                  className="like"
                >
                  <Favorite />
                </Button>{" "}
                {/* use this button to add a edit kind of action */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    alert(`프로젝트 수정 클릭: ${projectId}를 클릭하셨습니다.`);
                  }}
                  color="warning"
                  className="edit"
                >
                  <Dvr />
                </Button>
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    alert(`프로젝트 삭제 클릭: ${projectId}를 클릭하셨습니다.`);
                  }}
                  color="danger"
                  className="remove"
                >
                  <Close />
                </Button>
              </div>
            );
          }
        }
      ]
    }
  ];

  const [expanded, setExpanded] = React.useState({});
  const [resized, setResized] = React.useState([]);
  const [filterd, setFilterd] = React.useState([]);
  const [sorted, setSorted] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const [data, setData] = React.useState(tableData);

  return (
    <div>
      <ReactTable
        data={data}
        columns={columns}
        pivotBy={["name"]}
        filterable
        defaultPageSize={10}
        showPaginationTop={false}
        showPaginationBottom={true}
        className="-striped -highlight"
        // Controlled props
        page={page}
        pageSize={pageSize}
        sorted={sorted}
        expanded={expanded}
        resized={resized}
        // filterd={filterd}
        // Callbacks
        onSortedChange={sorted => {
          console.log("onSortedChange");
          console.log(sorted);
          return setSorted(sorted);
        }}
        onPageChange={page => {
          console.log("onPageChange");
          console.log(page);
          return setPage(page);
        }}
        onPageSizeChange={(pageSize, page) => {
          console.log("onPageSizeChange");
          console.log(pageSize);
          console.log(page);
          setPageSize(pageSize);
          setPage(page);

          return setPage(page);
        }}
        onExpandedChange={expanded => {
          console.log("onExpandedChange");
          console.log(expanded);
          return setExpanded(expanded);
        }}
        onResizedChange={resized => {
          console.log("onResizedChange");
          console.log(resized);
          return setResized(resized);
        }}
        getTrProps={(state, rowInfo) => {
          if (rowInfo && rowInfo.row) {
            //
            if (rowInfo.aggregated) {
              // rowInfo aggregated 된 rowInfo
              // 프로젝트 rowInfo
              return {
                onClick: e => {
                  const expanded = Object.assign({}, state.expanded);
                  expanded[rowInfo.nestingPath[0]] = !expanded[
                    rowInfo.nestingPath[0]
                  ];
                  state.onExpandedChange(expanded);
                }
              };
            } else {
              // rowInfo의 프로젝트
              return {
                onClick: () => {
                  window.open(
                    `/admin/my-robot/robots/${rowInfo.original.robot_id}`,
                    "_blank"
                  );
                  // props.history.push({
                  //   pathname: `/admin/my-robot/robots/${rowInfo.original.robot_id}`,
                  //   prev: "/admin/my-robot/"
                  // });
                }
              };
            }
          }
          return {};
        }}
        // getTrProps={(state, rowInfo) => {
        //   if (rowInfo && rowInfo.row) {
        //     return {
        //       onClick: (e) => {
        //         this.setState({
        //           selected: rowInfo.index
        //         })
        //       },
        //       style: {
        //         background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
        //         color: rowInfo.index === this.state.selected ? 'white' : 'black'
        //       }
        //     }
        //   }else{
        //     return {}
        //   }
        // }

        // onFilteredChange={filtered => {
        //   console.log("onFilterdChange");
        //   console.log(filterd);
        //   return setFilterd(filtered);
        // }}
      />
    </div>
  );
}
