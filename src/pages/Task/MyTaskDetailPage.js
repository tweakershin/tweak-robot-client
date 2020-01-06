import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";

import Assignment from "@material-ui/icons/Assignment";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import AceEditor from "react-ace";
import ReactTable from "react-table";

import CodeEditorContainer from "containers/Task/CodeEditorContainer";
import MyRobotTableContainer from "containers/Tables/MyRobotTableContainer";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
const useStyles = makeStyles(styles);

const sampleTask = {
  id: 1,
  inputformat: {
    url: "",
    useJs: ""
  },
  description: "",
  taskName: "",
  code: ""
};

export default function MyTaskDetailPage(props) {
  const classes = useStyles();

  const taskId = props.match.params.taskId;
  console.log(taskId);
  console.log(props);
  return (
    <div>
      <Card>
        <CardHeader color="primary" icon>
          <CardIcon color="primary">
            <Assignment />
          </CardIcon>

          <h4 className={classes.cardIconTitle}>taskDetail: {taskId}</h4>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} md={6}>
              Detail {taskId}
              <br />
              요기는 태스크 정보
              <ul>
                <li>0. task 이름</li>
                <li>1. input 형식</li>
                <li>2. output 형식</li>
                <li>3. 태스크 사용 로봇 개수</li>
                <li>4. task 설명</li>
                <li>5. task 상태 </li>
                <li>6. test 하기</li>
              </ul>
              <br /> 요기는 테스트 결과
              <br /> 예제 등
              <br />
            </GridItem>

            <GridItem xs={12} md={6}>
              <CodeEditorContainer />
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>

      {/* <GridItem xs={12} md={6}>
          <Card>
            <CardBody style={{ textAlign: "center" }}>sample2</CardBody>
          </Card>
        </GridItem> */}
    </div>
  );
}
