import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonThumbnail,
} from "@ionic/react";

import Footer from "../components/Footer";
import Header from "../components/Header";

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <IonGrid>
          <IonRow class="ion-padding ion-text-center welcomeText">
            <IonCol size="12">
              <h1>Welcome To HomeTasktic!</h1>
              <h2>The one stop place to manage your household chores</h2>
            </IonCol>
            <IonCol size="12">
              <IonThumbnail>
                <img
                  alt="placeholder"
                  src="https://media.giphy.com/media/3o7TKU8RvQuomFfUUU/giphy.gif"
                />
              </IonThumbnail>
            </IonCol>
          </IonRow>
          <IonRow class="ion-padding ion-text-center">
            <IonCol size="12">
              <IonButton href="signin" size="large">
                Sign In
              </IonButton>
              <IonButton href="signup" size="large">
                Sign Up
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
