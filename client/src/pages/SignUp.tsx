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
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
import HouseholdContext from "../contexts/HouseholdContext";

const SignUp: React.FC = () => {
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

  const options = [{ value: "parent", text: "Parent" }];

  // Set Role Values

  // Create Household
  let { createHousehold } = useContext(HouseholdContext);

  function handleSubmit(event: any) {
    event.preventDefault();
    createUser(newUser)
      .then(() => {
        navigate.push("/signin");
        createHousehold({
          name: newUser.householdName,
          userId: newUser.name,
        });
      })
      .catch((error: any) => {
        console.log(error);
        window.alert("Failed registration: error creating user");
      });
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <IonGrid>
          <IonRow class="ion-padding">
            <IonCol size="12">
              <div className="signupform">
                <h1 className="ion-text-center">Sign Up</h1>
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
                      <IonSelectOption key={option.value} value={option.value}>
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
                    value={newUser.householdName}
                  />
                  <br></br>
                  <IonRow class="ion-padding ion-text-center">
                    <IonCol size="12">
                      <IonButton type="submit" expand="block">
                        Sign Up
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

export default SignUp;
