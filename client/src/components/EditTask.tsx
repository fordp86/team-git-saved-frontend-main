import { IonSelect } from "@ionic/react";
import { IonSelectOption } from "@ionic/react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import UserContext from "../contexts/UserContext";
import TaskContext from "../contexts/TaskContext";
import Header from "./Header";

const EditTask: React.FC = (props) => {
  let { id } = useParams<{ id: string }>();
  let history = useHistory();

  let { editTask, getTask, task } = useContext(TaskContext);

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
  let { user, getOneUser } = useContext(UserContext);

  useEffect(() => {
    async function fetch() {
      await getOneUser(getSingleUser).then((user) => setUsers(user));
    }
    fetch();
  }, [getSingleUser, getOneUser]);

  let { userId, username, name, roleId, householdName } = user;

  const [users, setUsers] = useState({
    userId: userId,
    username: username,
    name: name,
    roleId: roleId,
    householdName: householdName,
  });

  useEffect(() => {
    async function fetch() {
      await getTask(id).then((task: any) => setUpdateTask(task));
    }
    fetch();
  }, [id, getTask]);

  let { taskId, title, pointValue, assignedTo } = task;

  let [updateTask, setUpdateTask] = useState({
    taskId: taskId,
    title: title,
    pointValue: pointValue,
    assignedTo: assignedTo,
  });

  // console.log(updateTask.taskId);

  function handleChange(event: any) {
    setUpdateTask((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    editTask(updateTask, updateTask.taskId)
      .then(() => {
        history.go(-1);
      })
      .catch((error: any) => {
        history.push("/signin");
        console.log(error);
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
      <IonContent fullscreen>
        <Header />
        <IonGrid>
          <UserContext.Consumer>
            {({ user }) => {
              if (hasJWT() && users.roleId === "parent") {
                return (
                  <IonRow class="ion-padding ion-text-center">
                    <IonCol size="12">
                      <form onSubmit={handleSubmit} className="taskSubmit">
                        <IonItem>
                          <IonLabel position="stacked">
                            Enter task title
                          </IonLabel>
                          <IonInput
                            type="text"
                            placeholder="Do Stuff"
                            name="title"
                            value={updateTask.title}
                            onIonChange={handleChange}
                          />
                        </IonItem>
                        <IonItem>
                          <IonLabel position="stacked">Point Value</IonLabel>
                          <IonSelect
                            value={updateTask.pointValue}
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
                            value={updateTask.assignedTo}
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
                          Update Task
                        </IonButton>
                      </form>
                    </IonCol>
                  </IonRow>
                );
              }
            }}
          </UserContext.Consumer>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditTask;
