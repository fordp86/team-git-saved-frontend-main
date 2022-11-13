import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { format, parseISO } from "date-fns";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TaskContext from "../contexts/TaskContext";
import UserContext from "../contexts/UserContext";
import "./Tasks.css";
import { IonSelect } from "@ionic/react";
import { IonSelectOption } from "@ionic/react";

const Tasks: React.FC = (props) => {
  //set history variable to useHistory for Navigation
  let history = useHistory();

  /* Start User Info */
  //Check if logged in
  function hasJWT() {
    let flag = false;
    //check user has JWT token
    localStorage.getItem("myUserToken") ? (flag = true) : (flag = false);
    return flag;
  }
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  //get current user
  function getUserFromToken() {
    if (hasJWT()) {
      let user = localStorage.getItem("myUserToken");
      let userToken = parseJwt(user);
      return userToken.userId;
    }
  }

  let getSingleUser = getUserFromToken();

  //Use User Context
  let { user, getOneUser, editUser } = useContext(UserContext);

  useEffect(() => {
    async function fetch() {
      await getOneUser(getSingleUser).then((user) => setUsers(user));
    }
    fetch();
  }, [getSingleUser, getOneUser]);

  let { userId, username, name, roleId, householdName, points } = user;

  const [users, setUsers] = useState({
    userId: userId,
    username: username,
    name: name,
    roleId: roleId,
    householdName: householdName,
    points: points,
  });

  /* End User Info */

  // Create Task Functions

  let [newTask, setNewTask] = useState({
    taskId: 0,
    title: "",
    pointValue: "",
    assignedTo: "",
    completed: false,
  });

  //use the TaskContext
  let { deleteTask, addTask, editTask } = useContext(TaskContext);

  //Listen for the input value of the task creation form
  function handleChange(event: any) {
    setNewTask((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value };
    });
  }

  // Addtaks Function
  function handleSubmit(event: any) {
    event.preventDefault();
    addTask(newTask).then(() => {
      history.push("/tasks");
      window.location.reload();
    });
  }

  //Edit Task Functions
  let [updateTask, setUpdateTask] = useState({
    completed: true,
  });

  //Checkbox Functions
  function markComplete(taskId: any) {
    console.log(updateTask);
    editTask(updateTask, taskId).then(() => {
      history.push("/tasks");
      //window.location.reload();
    });
  }

  //Update User Points on compilerOption
  let [updateUserPoints, setUserPoints] = useState({
    points: 0,
  });

  function totalUserPoints(taskpoints) {
    //set task Points
    let currentTaskPoints = Number(taskpoints);
    console.log("current task points are: " + currentTaskPoints);

    //set current user points
    let currentUserPoints = Number(users.points);
    console.log("current user points are: " + currentUserPoints);

    //get new user points
    let updatedUserPoints = Number(updateUserPoints.points);
    console.log("updated user points are: " + updatedUserPoints);

    //let newUserPoints = Number(updateUserPoints + currentUserPoints);

    let totalPoints;

    if (updateTask.completed === false) {
      let totalPoints = currentUserPoints - currentTaskPoints;
      console.log("total points are: " + totalPoints);
      return totalPoints;
    } else if (updateTask.completed === true) {
      let totalPoints = currentTaskPoints + currentUserPoints;
      console.log("total points are: " + totalPoints);
      return totalPoints;
    }

    let sendPoints = { points: totalPoints };
    console.log(sendPoints);

    editUser(sendPoints, users.userId).then(() => {
      history.push("/tasks");
      //window.location.reload();
    });
  }

  console.log(users.userId);

  function isChecked(event: any, taskId, pointValue) {
    //Create Variable to save checkbox selection
    let { checked } = event.target;
    console.log("checked " + checked);
    //update the state of completed value
    setUpdateTask((updateTask) => ({
      ...updateTask,
      completed: checked,
    }));

    markComplete(taskId);

    setUserPoints((updateUserPoints) => ({
      ...updateUserPoints,
      userId: users.userId,
      points: pointValue,
    }));

    totalUserPoints(pointValue);
  }

  function viewEditPage(taskId: any) {
    history.push(`/tasks/${taskId}`);
    window.location.reload();
  }

  //Delete Task Functions
  function removeTask(taskId: any) {
    deleteTask(taskId)
      .then(() => {
        history.push("/tasks");
        window.location.reload();
      })
      .catch((error: any) => {
        history.push("/signin");
      });
  }

  function pointOptions() {
    const options = [
      { value: 500, text: 500 },
      { value: 600, text: 600 },
      { value: 700, text: 700 },
      { value: 800, text: 800 },
      { value: 900, text: 900 },
      { value: 1000, text: 1000 },
    ];
    let pointOptionSelect = options.map((option) => (
      <IonSelectOption key={option.value} value={option.value}>
        {option.text}
      </IonSelectOption>
    ));

    return pointOptionSelect;
  }

  return (
    <IonPage>
      <IonContent fullscreen scrollEvents={true}>
        <Header />
        <IonGrid>
          <IonRow class="ion-padding ion-text-center">
            <IonCol size="12">
              <h1>Your Tasks</h1>
            </IonCol>
          </IonRow>
          <UserContext.Consumer>
            {({ user }) => {
              if (hasJWT() && users.roleId === "parent") {
                return (
                  <IonRow class="ion-padding ion-text-center">
                    <IonCol size="12">
                      <h2>Add Tasks</h2>
                      <form onSubmit={handleSubmit} className="taskSubmit">
                        <IonItem>
                          <IonLabel position="stacked">
                            Enter task title
                          </IonLabel>
                          <IonInput
                            type="text"
                            placeholder="Do Stuff"
                            name="title"
                            value={newTask.title}
                            onIonChange={handleChange}
                          />
                        </IonItem>
                        <IonItem>
                          <IonLabel position="stacked">Point Value</IonLabel>
                          <IonSelect
                            value={newTask.pointValue}
                            placeholder="500"
                            name="pointValue"
                            onIonChange={handleChange}
                          >
                            {pointOptions()}
                          </IonSelect>
                        </IonItem>
                        <IonItem>
                          <IonLabel position="stacked">Assigned To</IonLabel>
                          <IonSelect
                            value={newTask.assignedTo}
                            placeholder="Assign Household Member"
                            name="assignedTo"
                            onIonChange={handleChange}
                          >
                            {user.map((u) => {
                              if (
                                u.roleId === "child" &&
                                users.householdName === u.householdName
                              ) {
                                return (
                                  <IonSelectOption
                                    key={u.userId}
                                    value={u.name}
                                  >
                                    {u.name}
                                  </IonSelectOption>
                                );
                              }
                            })}
                          </IonSelect>
                        </IonItem>
                        <IonButton type="submit" expand="block">
                          Add Task
                        </IonButton>
                      </form>
                    </IonCol>
                  </IonRow>
                );
              } else {
                return <p></p>;
              }
            }}
          </UserContext.Consumer>

          <UserContext.Consumer>
            {({ user }) => {
              if (hasJWT()) {
                return (
                  <TaskContext.Consumer>
                    {({ task }) => {
                      if (hasJWT() && users.roleId === "parent") {
                        return (
                          <IonRow class="ion-padding ion-text-center">
                            <IonCol size="12">
                              <IonList className="homeTasklist parent todo">
                                <h2>To Do</h2>
                                {task.map((t: any) => {
                                  let pointsAsNum = parseInt(t.pointValue);
                                  if (t.completed === false) {
                                    return (
                                      <IonItemSliding key={t.taskId}>
                                        <IonItem lines="none">
                                          <IonLabel>
                                            <span className="labelTitle">
                                              Task:
                                              <span className="labelValue">
                                                {t.title}
                                              </span>
                                            </span>
                                            <span className="labelTitle">
                                              Points:
                                              <span className="labelValue">
                                                {t.pointValue}
                                              </span>
                                            </span>
                                            <span className="labelTitle">
                                              For:
                                              <span className="labelValue">
                                                {t.assignedTo}
                                              </span>
                                            </span>
                                            <span className="labelTitle">
                                              By:
                                              <span className="labelValue">
                                                <a href={`/profile`}>
                                                  {users.username}
                                                </a>
                                              </span>
                                            </span>
                                          </IonLabel>
                                          <IonCheckbox
                                            slot="start"
                                            onIonChange={(e) =>
                                              isChecked(
                                                e,
                                                `${t.taskId}`,
                                                `${pointsAsNum}`
                                              )
                                            }
                                            name={`completed`}
                                            value={updateTask.completed}
                                          ></IonCheckbox>
                                        </IonItem>
                                        <IonItemOptions side="end">
                                          <IonItemOption
                                            color="tertiary"
                                            onClick={() =>
                                              viewEditPage(`${t.taskId}`)
                                            }
                                          >
                                            Edit
                                          </IonItemOption>
                                          <IonItemOption
                                            color="danger"
                                            onClick={() =>
                                              removeTask(`${t.taskId}`)
                                            }
                                          >
                                            Delete
                                          </IonItemOption>
                                        </IonItemOptions>
                                      </IonItemSliding>
                                    );
                                  } else {
                                    return <p></p>;
                                  }
                                })}
                              </IonList>
                            </IonCol>
                            <IonCol size="12">
                              <IonList className="homeTasklist parent done">
                                <h2>Done</h2>
                                {task.map((t: any) => {
                                  let pointsAsNum = parseInt(t.pointValue);
                                  if (t.completed === true) {
                                    return (
                                      <IonItemSliding key={t.taskId}>
                                        <IonItem lines="none">
                                          <IonLabel>
                                            <span className="labelTitle">
                                              Task:
                                              <span className="labelValue">
                                                {t.title}
                                              </span>
                                            </span>
                                            <span className="labelTitle">
                                              Points:
                                              <span className="labelValue">
                                                {t.pointValue}
                                              </span>
                                            </span>
                                            <span className="labelTitle">
                                              For:
                                              <span className="labelValue">
                                                {t.assignedTo}
                                              </span>
                                            </span>
                                            <span className="labelTitle">
                                              By:
                                              <span className="labelValue">
                                                <a href={`/profile`}>
                                                  {users.username}
                                                </a>
                                              </span>
                                            </span>
                                          </IonLabel>
                                          <IonCheckbox
                                            slot="start"
                                            onIonChange={(e) =>
                                              isChecked(
                                                e,
                                                `${t.taskId}`,
                                                `${pointsAsNum}`
                                              )
                                            }
                                            checked={t.completed}
                                            name={`completed`}
                                            value={updateTask.completed}
                                          ></IonCheckbox>
                                        </IonItem>
                                        <IonItemOptions side="end">
                                          <IonItemOption
                                            color="tertiary"
                                            onClick={() =>
                                              viewEditPage(`${t.taskId}`)
                                            }
                                          >
                                            Edit
                                          </IonItemOption>
                                          <IonItemOption
                                            color="danger"
                                            onClick={() =>
                                              removeTask(`${t.taskId}`)
                                            }
                                          >
                                            Delete
                                          </IonItemOption>
                                        </IonItemOptions>
                                      </IonItemSliding>
                                    );
                                  } else {
                                    return <p></p>;
                                  }
                                })}
                              </IonList>
                            </IonCol>
                          </IonRow>
                        );
                      } else if (hasJWT() && users.roleId === "child") {
                        return (
                          <IonRow class="ion-padding ion-text-center">
                            <IonCol size="12">
                              <IonList className="homeTasklist parent todo">
                                <h2>To Do</h2>
                                {task.map((t: any) => {
                                  let pointsAsNum = parseInt(t.pointValue);
                                  let userHouseHold = users.householdName;
                                  let taskCreated = parseISO(t.createdAt);
                                  let taskCreatedDate = format(
                                    taskCreated,
                                    "M/dd/yy"
                                  );
                                  if (
                                    t.completed === false &&
                                    users.householdName === userHouseHold
                                  ) {
                                    return (
                                      <IonItem key={t.taskId} lines="none">
                                        <IonLabel>
                                          <span className="labelTitle">
                                            Task:
                                            <span className="labelValue">
                                              {t.title}
                                            </span>
                                          </span>
                                          <span className="labelTitle">
                                            Points:
                                            <span className="labelValue">
                                              {t.pointValue}
                                            </span>
                                          </span>
                                          <span className="labelTitle">
                                            For:
                                            <span className="labelValue">
                                              {t.assignedTo}
                                            </span>
                                          </span>
                                          <span className="labelTitle">
                                            By:
                                            <span className="labelValue">
                                              {taskCreatedDate}
                                            </span>
                                          </span>
                                        </IonLabel>
                                        <IonCheckbox
                                          slot="start"
                                          onIonChange={(e) =>
                                            isChecked(
                                              e,
                                              `${t.taskId}`,
                                              `${pointsAsNum}`
                                            )
                                          }
                                          name={`completed`}
                                          value={updateTask.completed}
                                        ></IonCheckbox>
                                      </IonItem>
                                    );
                                  } else {
                                    return <p></p>;
                                  }
                                })}
                              </IonList>
                            </IonCol>
                            <IonCol size="12">
                              <IonList className="homeTasklist parent done">
                                <h2>Done</h2>
                                {task.map((t: any) => {
                                  let pointsAsNum = parseInt(t.pointValue);
                                  let userHouseHold = users.householdName;
                                  let taskCreated = parseISO(t.createdAt);
                                  let taskCreatedDate = format(
                                    taskCreated,
                                    "M/dd/yy"
                                  );
                                  if (
                                    t.completed === true &&
                                    users.householdName === userHouseHold
                                  ) {
                                    return (
                                      <IonItem key={t.taskId} lines="none">
                                        <IonLabel>
                                          <span className="labelTitle">
                                            Task:
                                            <span className="labelValue">
                                              {t.title}
                                            </span>
                                          </span>
                                          <span className="labelTitle">
                                            Points:
                                            <span className="labelValue">
                                              {t.pointValue}
                                            </span>
                                          </span>
                                          <span className="labelTitle">
                                            For:
                                            <span className="labelValue">
                                              {t.assignedTo}
                                            </span>
                                          </span>
                                          <span className="labelTitle">
                                            By:
                                            <span className="labelValue">
                                              {taskCreatedDate}
                                            </span>
                                          </span>
                                        </IonLabel>
                                        <IonCheckbox
                                          slot="start"
                                          onIonChange={(e) =>
                                            isChecked(
                                              e,
                                              `${t.taskId}`,
                                              `${pointsAsNum}`
                                            )
                                          }
                                          checked={t.completed}
                                          name={`completed`}
                                          value={updateTask.completed}
                                        ></IonCheckbox>
                                      </IonItem>
                                    );
                                  } else {
                                    return <p></p>;
                                  }
                                })}
                              </IonList>
                            </IonCol>
                          </IonRow>
                        );
                      }
                    }}
                  </TaskContext.Consumer>
                );
              }
            }}
          </UserContext.Consumer>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
