import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import UserContext from "../contexts/UserContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let { signInUser } = useContext(UserContext);
  let history = useHistory();

  function handleSubmit(event: any) {
    event.preventDefault();
    signInUser(username, password)
      .then(() => {
        history.push("/tasks");
        window.location.reload();
      })
      .catch((error: any) => {
        console.log(error);
        window.alert("Failed login");
      });
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <IonGrid>
          <IonRow class="ion-padding">
            <IonCol size="12">
              <div className="signinform">
                <h1 className="ion-text-center">Sign In</h1>
                <form className="form" onSubmit={handleSubmit}>
                  <IonLabel position="stacked">UserName: </IonLabel>
                  <IonInput
                    class="color"
                    placeholder="Enter Username"
                    type="text"
                    name="username"
                    onIonChange={(e: any) => setUsername(e.target.value)}
                  />
                  <br></br>
                  <IonLabel position="stacked">Password: </IonLabel>
                  <IonInput
                    class="color"
                    placeholder="Enter Password"
                    type="password"
                    name="password"
                    onIonChange={(e: any) => setPassword(e.target.value)}
                  />
                  <br></br>
                  <IonRow class="ion-padding ion-text-center">
                    <IonCol size="12">
                      <IonButton type="submit" expand="block">
                        Sign In
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
    </IonPage>
  );
};

export default SignIn;
