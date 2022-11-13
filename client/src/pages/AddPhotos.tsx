import { Photo } from "@capacitor/camera";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonPage,
  IonTitle,
} from "@ionic/react";
import { useState } from "react";
import { useCamera } from "../hooks/useCamera";

import Footer from "../components/Footer";
import Header from "../components/Header";

const AddPhotos: React.FC = () => {
  const { takePhoto } = useCamera();
  const [imgUrl, setImgUrl] = useState("");
  const getPhoto = () => {
    takePhoto().then((pic: Photo) => {
      setImgUrl(pic.webPath ?? "");
    });
  };

  return (
    <IonPage>
      <IonContent>
        <Header />
        <IonGrid>
          <IonTitle>Show your Completed Task!</IonTitle>
          <IonButton color="success" onClick={getPhoto}>
            Take Photo!
          </IonButton>
          <img src={imgUrl} alt="" />
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default AddPhotos;
