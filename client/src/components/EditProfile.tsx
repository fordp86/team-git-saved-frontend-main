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
import Header from "../components/Header";

const EditProfile: React.FC = (props) => {
  let { id } = useParams<{ id: string }>();
  let history = useHistory();

  let { editUser, getOneUser, user } = useContext(UserContext);

  useEffect(() => {
    async function fetch() {
      await getOneUser(id).then((user: any) => setUpdateUser(user));
    }
    fetch();
  }, [id, getOneUser]);

  //console.log(getUser(id));

  let { userId, username, name, bio, profileImg, householdName } = user;

  let [updateUser, setUpdateUser] = useState({
    userId: userId,
    username: username,
    name: name,
    bio: bio,
    profileImg: profileImg,
    householdName: householdName,
  });

  //console.log(updateUser.userId);

  function handleChange(event: any) {
    setUpdateUser((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    editUser(updateUser, updateUser.userId)
      .then(() => {
        history.go(-1);
      })
      .catch((error: any) => {
        history.push("/signin");
        console.log(error);
      });
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <IonGrid>
          <IonRow class="ion-padding ion-text-center">
            <IonCol size="12">
              <h1>Update Profile</h1>
              <form onSubmit={handleSubmit} className="rewardSubmit">
                <IonItem>
                  <IonLabel position="stacked">Username</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="bob123"
                    name="username"
                    value={updateUser.username}
                    onIonChange={handleChange}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Name</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Bob"
                    name="name"
                    value={updateUser.name}
                    onIonChange={handleChange}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Bio</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="About you"
                    name="bio"
                    value={updateUser.bio}
                    onIonChange={handleChange}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Profile Image</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Link To Image"
                    name="profileImg"
                    value={updateUser.profileImg}
                    onIonChange={handleChange}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Household Name</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="The Henleys"
                    name="householdName"
                    value={updateUser.householdName}
                    onIonChange={handleChange}
                  />
                </IonItem>
                <IonButton type="submit" expand="block">
                  Update Profile
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
