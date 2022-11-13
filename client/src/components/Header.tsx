import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

interface ContainerProps {}

const Header: React.FC<ContainerProps> = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
        <IonTitle>
          <a href="/tasks">
            <IonImg
              src="../../assets/HomeTasktic-Logo-Top.png"
              alt="HomeTasktic Logo"
            ></IonImg>
          </a>
        </IonTitle>
        <IonButtons slot="end">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
