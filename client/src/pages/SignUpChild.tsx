import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
//import HouseholdContext from "../contexts/HouseholdContext";

const SignUpChild: React.FC = () => {
  let [newUser, setNewUser] = useState({
    username: "",
    name: "",
    password: "",
    householdName: "",
    roleId: "",
  });

  let { createUser } = useContext(UserContext);
  let navigate = useHistory();

  console.log(newUser);

  function handleChange(event: any) {
    setNewUser((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value };
    });
  }

  const options = [{ value: "child", text: "Child" }];

  // Set Role Values

  /** Get User Info **/
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
      await getOneUser(getSingleUser).then((user) => setUserInfo(user));
    }
    fetch();
  }, [getSingleUser, getOneUser]);

  //Get Profile data
  let { userId, roleId, householdName } = user;

  /* End User Info */

  //Set User Info
  let [userInfo, setUserInfo] = useState({
    userId: userId,
    householdName: householdName,
    roleId: roleId,
  });

  /** End Get User Info **/

  // Create Household
  //let { createHousehold } = useContext(HouseholdContext);

  function handleSubmit(event: any) {
    event.preventDefault();
    createUser(newUser)
      .then(() => {
        navigate.go(-1);
        //createHousehold({name: newUser.householdName});
      })
      .catch((error: any) => {
        console.log(error);
        window.alert("Failed registration: error creating user");
      });
  }

  return (
    <IonPage>
      {hasJWT() && userInfo.roleId === "parent" ? (
        <IonContent fullscreen>
          <Header />
          <IonGrid>
            <IonRow class="ion-padding">
              <IonCol size="12">
                <div className="signupform">
                  <h1 className="ion-text-center">Sign Up Child</h1>
                  <form onSubmit={handleSubmit}>
                    <IonLabel position="stacked">UserName: </IonLabel>
                    <IonInput
                      class="color"
                      onIonChange={handleChange}
                      placeholder="Enter Username"
                      type="text"
                      name="username"
                      value={newUser.username}
                    />
                    <br></br>
                    <IonLabel position="stacked">Name: </IonLabel>
                    <IonInput
                      class="color"
                      onIonChange={handleChange}
                      placeholder="Enter Name"
                      type="text"
                      name="name"
                      value={newUser.name}
                    />
                    <br></br>
                    <IonLabel position="stacked">Password: </IonLabel>
                    <IonInput
                      class="color"
                      onIonChange={handleChange}
                      placeholder="Enter Password"
                      type="password"
                      name="password"
                      value={newUser.password}
                    />
                    <br></br>
                    <IonLabel position="stacked">Role: </IonLabel>
                    <IonSelect
                      value={newUser.roleId}
                      placeholder="Chose Your Role"
                      name="roleId"
                      onIonChange={handleChange}
                      className="color"
                    >
                      {options.map((option) => (
                        <IonSelectOption
                          key={option.value}
                          value={option.value}
                        >
                          {option.text}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                    <br></br>
                    <IonLabel position="stacked">Household: </IonLabel>
                    <IonInput
                      class="color"
                      onIonChange={handleChange}
                      placeholder="Household Name"
                      type="text"
                      name="householdName"
                      value={userInfo.householdName}
                    />
                    <br></br>
                    <IonRow class="ion-padding ion-text-center">
                      <IonCol size="12">
                        <IonButton type="submit" expand="block">
                          Sign Up Child
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </form>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
          <Footer />
        </IonContent>
      ) : (
        <p>Only Parents Can View This Form</p>
      )}
    </IonPage>
  );
};

export default SignUpChild;
