import { IonSelect } from "@ionic/react";
import { IonSelectOption } from "@ionic/react";
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RewardsContext from "../contexts/RewardsContext";
import UserContext from "../contexts/UserContext";
import "./App.css";

const Rewards: React.FC = () => {
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

  /* End User Info */

  let [newRewards, setNewRewards] = useState({
    title: "",
    pointValue: "",
  });

  let { deleteReward, addReward } = useContext(RewardsContext);
  let history = useHistory();

  function handleChange(event: any) {
    setNewRewards((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value };
    });
  }

  function vieweditRewards(rewardId: any) {
    history.push(`/rewards/${rewardId}`);
    window.location.reload();
  }
  //console.log(newRewards);

  function handleSubmit(event: any) {
    event.preventDefault();
    addReward(newRewards).then(() => {
      history.push("/rewards");
      window.location.reload();
    });
  }

  function removeRewards(rewardId: any) {
    deleteReward(rewardId)
      .then(() => {
        history.push("/rewards");
        window.location.reload();
      })
      .catch((error: any) => {
        history.push("/rewards");
        //console.log(error);
      });
  }

  function pointOptions() {
    const options = [
      { value: 2000, text: 2000 },
      { value: 3000, text: 3000 },
      { value: 4000, text: 4000 },
      { value: 5000, text: 5000 },
      { value: 6000, text: 6000 },
      { value: 7000, text: 7000 },
      { value: 8000, text: 8000 },
      { value: 9000, text: 9000 },
      { value: 10000, text: 10000 },
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
          <IonRow class="ion-padding ion-text-center">
            <IonCol size="12">
              <h1>Rewards</h1>
            </IonCol>
          </IonRow>
          <UserContext.Consumer>
            {({ user }) => {
              if (hasJWT() && users.roleId === "parent") {
                return (
                  <IonRow class="ion-padding ion-text-center">
                    <IonCol size="12">
                      <h2>Add Reward</h2>
                      <form onSubmit={handleSubmit} className="rewardSubmit">
                        <IonItem>
                          <IonLabel position="stacked">Title</IonLabel>
                          <IonInput
                            type="text"
                            placeholder="Hour of Tv"
                            name="title"
                            value={newRewards.title}
                            onIonChange={handleChange}
                          />
                        </IonItem>
                        <IonItem>
                          <IonLabel position="stacked">Point Value</IonLabel>
                          <IonSelect
                            value={newRewards.pointValue}
                            placeholder="2000"
                            name="pointValue"
                            onIonChange={handleChange}
                          >
                            {pointOptions()}
                          </IonSelect>
                        </IonItem>
                        <IonButton type="submit" expand="block">
                          Add Reward
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
          <RewardsContext.Consumer>
            {({ reward }) => {
              return (
                <IonRow>
                  {reward.map((r: any) => {
                    if (hasJWT() && users.roleId === "child") {
                      return (
                        <IonCol
                          size-lg="3"
                          size-xs="12"
                          class="ion-text-center"
                          key={r.rewardId}
                        >
                          <IonCard className="ion-padding">
                            <IonCardHeader>
                              <IonCardTitle>{r.title}</IonCardTitle>
                              <IonCardSubtitle>{r.pointValue}</IonCardSubtitle>
                            </IonCardHeader>
                          </IonCard>
                        </IonCol>
                      );
                    } else {
                      return (
                        <IonCol
                          size-lg="3"
                          size-xs="12"
                          class="ion-text-center"
                          key={r.rewardId}
                        >
                          <IonCard className="ion-padding">
                            <IonCardHeader>
                              <IonCardTitle>{r.title}</IonCardTitle>
                              <IonCardSubtitle>{r.pointValue}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonButton
                              color="tertiary"
                              onClick={() => vieweditRewards(`${r.rewardId}`)}
                            >
                              Edit
                            </IonButton>
                            <IonButton
                              color="danger"
                              onClick={() => removeRewards(`${r.rewardId}`)}
                            >
                              Delete
                            </IonButton>
                          </IonCard>
                        </IonCol>
                      );
                    }
                  })}
                </IonRow>
              );
            }}
          </RewardsContext.Consumer>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Rewards;
