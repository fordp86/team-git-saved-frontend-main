import {
  IonButton,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DiscussionContext from "../contexts/DiscussionContext";
import Header from "./Header";

const EditDiscussion: React.FC = (props) => {
  let { id } = useParams<{ id: string }>();
  let history = useHistory();

  let { editPost, getPost, discussion } = useContext(DiscussionContext);

  useEffect(() => {
    async function fetch() {
      await getPost(id).then((discussion: any) => setChangePost(discussion));
    }
    fetch();
  }, [id, getPost]);

  let { discussionId, headline, content } = discussion;

  let [changePost, setChangePost] = useState({
    discussionId: discussionId,
    headline: headline,
    content: content,
  });

  console.log(changePost.discussionId);

  function handleChange(event: any) {
    setChangePost((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    editPost(changePost, changePost.discussionId)
      .then(() => {
        history.push("/discussion");
      })
      .catch((error: any) => {
        history.push("/discussion");
        console.log(error);
      });
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <IonGrid>
          <form onSubmit={handleSubmit} className="dissSubmit">
            <IonItem>
              <IonLabel position="stacked">Discussion Headline</IonLabel>
              <IonInput
                type="text"
                name="headline"
                value={changePost.headline}
                onIonChange={handleChange}
              />
              <IonLabel position="stacked">Content</IonLabel>
              <IonInput
                type="text"
                placeholder="Start Post Here"
                name="content"
                value={changePost.content}
                onIonChange={handleChange}
              />
            </IonItem>
            <IonButton type="submit" expand="block">
              Confirm Edit
            </IonButton>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditDiscussion;
