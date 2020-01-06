import namor from "namor";
import { tag } from "postcss-selector-parser";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

function makeTags() {
  let tagChange;
  const tagCount = Math.floor(Math.random() * 4);

  let tags = [];
  for (let i = 0; i < tagCount; i++) {
    tagChange = Math.random();
    tags.push(
      tagChange > 0.75
        ? "tag1"
        : tagChange > 0.5
        ? "tag2"
        : tagChange > 0.25
        ? "tag3"
        : "tag4"
    );
  }
  return Array.from(new Set(tags));
}

const makeRobot = () => {
  let statusChange;
  const robotCount = Math.floor(Math.random() * 10);

  const robots = [];
  for (let i = 0; i < robotCount; i++) {
    statusChange = Math.random();
    robots.push({
      name: namor.generate({ words: 2, saltLength: 0 }),
      tags: makeTags(),
      task_num: Math.floor(Math.random() * 20),
      status:
        statusChange > 0.8
          ? "DEBUG"
          : statusChange > 0.6
          ? "DOING"
          : statusChange > 0.4
          ? "DONE"
          : statusChange > 0.2
          ? "WARN"
          : "ERROR",
      description: namor.generate({ words: 4, saltLength: 5 })
    });
  }

  return robots;
};

const MyRobotMock = (projectName, robotName) => {
  // const projectNameChange = Math.random();
  // const projectName =
  //   projectNameChange > 0.66
  //     ? "Project A"
  //     : projectNameChange > 0.33
  //     ? "Project B"
  //     : "Project C";
  const statusChange = Math.random();

  return {
    project_id: projectName,
    project_name: projectName,
    // robots: makeRobot(),
    robot_id: Math.random()
      .toString(36)
      .substr(2, 9),
    robot_name: robotName,
    robot_tags: makeTags(),
    robot_task_num: Math.floor(Math.random() * 20),
    robot_status:
      statusChange > 0.8
        ? "DEBUG"
        : statusChange > 0.6
        ? "DOING"
        : statusChange > 0.4
        ? "DONE"
        : statusChange > 0.2
        ? "WARN"
        : "ERROR",
    robot_description: namor.generate({ words: 4, saltLength: 5 }),
    project_description: `${projectName}에 대한 설명입니다.`
  };
};

export function generateMyRobotMock(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];

    let projects = [];
    for (let i = 0; i < 57; i++) {
      for (let j = 0; j < 20; j++) {
        projects.push(
          MyRobotMock(`Project ${i + 1}`, `Project ${i + 1} - Robot${j + 1}`)
        );
      }
    }
    return projects;
  };

  return makeDataLevel();
}

export function taskMockData(id, isCollection) {
  const namorCheck = Math.random();

  return {
    id: id,
    task_name: namor.generate({ words: 3 }),
    author:
      namorCheck > 0.75
        ? "us621011"
        : namorCheck > 0.5
        ? "admin"
        : namorCheck > 0.25
        ? "minho"
        : "inae",
    type: isCollection ? "collection" : "task"
  };
}

export function generateTaskMock() {
  return [
    {
      id: 1,
      type: "collection",
      name: "콜렉션1",
      author: "신윤수"
    },
    {
      id: 3,
      type: "collection",
      name: "콜렉션2",
      author: "신정수"
    },
    {
      id: 2,
      type: "task",
      name: "task1",
      author: "신윤수"
    },
    {
      id: 4,
      type: "task",
      name: "task2",
      author: "신윤수"
    }
  ];
}
