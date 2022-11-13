import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonThumbnail,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";

import Footer from "../components/Footer";
import Header from "../components/Header";

const MeetTheDevs: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <IonGrid>
          <IonRow class="ion-padding ion-text-center welcomeText">
            <IonCol size="12">
              <h1>Meet Your Developers</h1>
              <h2>Learn more about everyone who worked on the project</h2>
            </IonCol>
          </IonRow>
          <IonRow class="thedevs">
            <IonCol size-lg="4" size-xs="12" class="ion-text-center">
              <IonCard>
                <IonThumbnail>
                  <img
                    alt="Destiny Jackson"
                    src="../../assets/destinyjackson.jpg"
                  />
                </IonThumbnail>
                <IonCardHeader>
                  <IonCardTitle>Destiny Jackson</IonCardTitle>
                  <IonCardSubtitle>Project Role: FrontEnd</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  Destiny has a background in Health Care as a Recreational
                  Therapist.She is looking forward to making a career switch to
                  integrate her health care knowledge with the tech field.
                  Destiny was a part of the front end team for HomeTastic and
                  learned about creating applications and the importance of
                  front end and back end working together.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size-lg="4" size-xs="12" class="ion-text-center">
              <IonCard>
                <IonThumbnail>
                  <img
                    alt="Matthew Goochey"
                    src="../../assets/mattgoochey.png"
                  />
                </IonThumbnail>
                <IonCardHeader>
                  <IonCardTitle>Matthew Goochey</IonCardTitle>
                  <IonCardSubtitle>Project Role: Backend</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  Matthew is a FullStack Developer from Warner Robins, Georgia.
                  When he is not behind a screen, you can find him somewhere in
                  the outdoors re-connecting with God's beautiful creations!
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size-lg="4" size-xs="12" class="ion-text-center">
              <IonCard>
                <IonThumbnail>
                  <img alt="Ford Henley" src="../../assets/fordhenley.jpeg" />
                </IonThumbnail>
                <IonCardHeader>
                  <IonCardTitle>Ford Henley</IonCardTitle>
                  <IonCardSubtitle>Project Role: Frontend</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  Ford is a Full Stack Developer and Digital Marketer located in
                  Austin, TX. He enjoys rugby, reading and spending time with
                  family. He is a self motivated and lifetime learner looking to
                  make an impact in your business.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size-lg="4" size-xs="12" class="ion-text-center">
              <IonCard>
                <IonThumbnail>
                  <img alt="Kenny Tyson" src="../../assets/kennytyson.jpeg" />
                </IonThumbnail>
                <IonCardHeader>
                  <IonCardTitle>Kenny Tyson</IonCardTitle>
                  <IonCardSubtitle>Project Role: Backend</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  Kenny Tyson is a full stack developer from California whose
                  passionate about music, business, friends and family. He is
                  ambitious, eager to learn, and willing to take risks.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size-lg="4" size-xs="12" class="ion-text-center">
              <IonCard>
                <IonThumbnail>
                  <img
                    alt="Josiah Vargas"
                    src="../../assets/josiahvargas.jpg"
                  />
                </IonThumbnail>
                <IonCardHeader>
                  <IonCardTitle>Josiah Vargas</IonCardTitle>
                  <IonCardSubtitle>Project Role: Backend</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  Josiah is thrilled to be a newcomer to the technology space.
                  He enjoys chess and sleeping and also is a practicing blue
                  belt in the 10th Planet Jiu-Jitsu system. He is looking
                  forward to a bright future of his own and those going through
                  the Bethel College program.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size-lg="4" size-xs="12" class="ion-text-center">
              <IonCard>
                <IonThumbnail>
                  <img
                    alt="Brandon Allen"
                    src="../../assets/brandonallen.jpeg"
                  />
                </IonThumbnail>
                <IonCardHeader>
                  <IonCardTitle>Brandon Allen</IonCardTitle>
                  <IonCardSubtitle>Project Role: Frontend</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  Brandon Allen is married and has 2 daughters. He loves music
                  and has been playing bass for 22 years. He wanted his family
                  to have a better life so he decided to enroll in Bethel
                  Technology School where he earned a certificate in Full Stack
                  Development. He loves challenges and problem solving. He
                  doesn’t shy away from failure bc he knows you always learn
                  from your mistakes and that’s how you get better. His favorite
                  saying is, “If you aren’t growing, you are dying!”. That’s why
                  he is always learning something new so he can be better every
                  day.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default MeetTheDevs;
