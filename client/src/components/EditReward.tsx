import { IonSelect } from "@ionic/react";
import { IonSelectOption } from "@ionic/react";
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
import RewardsContext from "../contexts/RewardsContext";
import Header from "./Header";

const EditReward: React.FC = (props) => {
  let { id } = useParams<{ id: string }>();
  let history = useHistory();

  let { editReward, getReward, reward } = useContext(RewardsContext);

  useEffect(() => {
    async function fetch() {
      await getReward(id).then((reward: any) => setUpdateReward(reward));
    }
    fetch();
  }, [id, getReward]);

  let { rewardId, title, pointValue } = reward;

  let [updateReward, setUpdateReward] = useState({
    rewardId: rewardId,
    title: title,
    pointValue: pointValue,
  });

  console.log(updateReward.rewardId);

  function handleChange(event: any) {
    setUpdateReward((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    editReward(updateReward, updateReward.rewardId)
      .then(() => {
        history.push("/rewards");
      })
      .catch((error: any) => {
        history.push("/signin");
        console.log(error);
      });
  }
  function pointOptions() {
    const options = [
      { value: 2000, text: 2000 },
      { value: 3000, text: 3000 },
      { value: 4000, text: 4000 },
      { value: 4000, text: 4000 },
      { value: 5000, text: 5000 },
      { value: 6000, text: 6000 },
      { value: 7000, text: 7000 },
      { value: 7000, text: 7000 },
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
              <form onSubmit={handleSubmit} className="rewardSubmit">
                <IonItem>
                  <IonLabel position="stacked">Enter task title</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Do Stuff"
                    name="title"
                    value={updateReward.title}
                    onIonChange={handleChange}
                  />
                  <IonLabel position="stacked">Point Value</IonLabel>
                  <IonSelect
                    value={updateReward.pointValue}
                    placeholder="2000"
                    name="pointValue"
                    onIonChange={handleChange}
                  >
                    {pointOptions()}
                  </IonSelect>
                </IonItem>
                <IonButton type="submit" expand="block">
                  Update Reward
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditReward;
