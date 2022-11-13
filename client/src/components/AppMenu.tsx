import {
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonList,
  IonAvatar,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import UserContext from "../contexts/UserContext";

const AppMenu: React.FC = () => {
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

  function signOutUser(event) {
    //check user has JWT token
    event.preventDefault();
    localStorage.removeItem("myUserToken");
    history.push("/welcome");
    window.location.reload();
  }

  //get current user
  function getUserFromToken() {
    if (hasJWT()) {
      let user = localStorage.getItem("myUserToken");
      let userToken = parseJwt(user);
      return userToken.userId;
    }
  }

  //Use User Context
  let { user, getOneUser } = useContext(UserContext);

  const getSingleUser = getUserFromToken();

  useEffect(() => {
    async function fetch() {
      await getOneUser(getSingleUser).then((user) => setUsers(user));
    }
    fetch();
  }, [getSingleUser, getOneUser]);

  let { userId, name, profileImg } = user;

  const [users, setUsers] = useState({
    userId: userId,
    name: name,
    profileImg: profileImg,
  });

  return (
    <UserContext.Consumer>
      {({ user }) => {
        if (hasJWT()) {
          return (
            <IonList>
              <IonMenuToggle>
                <IonItem routerLink={`/profile`}>
                  <IonAvatar slot="end">
                    {!users.profileImg ? (
                      <img
                        alt={users.name}
                        src="https://via.placeholder.com/500"
                      />
                    ) : (
                      <img src={users.profileImg} alt={users.name} />
                    )}
                  </IonAvatar>
                  <IonLabel>Profile</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/tasks">Tasks</IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/discussion">Discussion</IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/rewards">Rewards</IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/devs">Meet The Devs</IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem
                  routerLink="/signout"
                  onClick={(event) => signOutUser(event)}
                >
                  Sign Out
                </IonItem>
              </IonMenuToggle>
            </IonList>
          );
        } else {
          return (
            <IonList>
              <IonMenuToggle>
                <IonItem routerLink="/welcome">Welcome</IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/devs">Meet The Devs</IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/signin">Sign In</IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/signup">Sign Up</IonItem>
              </IonMenuToggle>
            </IonList>
          );
        }
      }}
    </UserContext.Consumer>
  );
};

export default AppMenu;
