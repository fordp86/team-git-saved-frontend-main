import { IonButton } from "@ionic/react";
import { createRef } from "react";
import "./Footer.css";

interface ContainerProps {}

const ScrollToTop: React.FC<ContainerProps> = () => {
  const contentRef = createRef<HTMLIonContentElement>();
  //window.scrollTo(0, 0);
  //window.scrollTo({ top:0, behavior: 'smooth' })

  const handleClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    console.log("The link was clicked.");
  };
  function scrollToTop() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the bottom instead of instantly
    contentRef.current?.scrollToTop(500);
  }

  return (
    <IonButton expand="block" onClick={scrollToTop}>
      Scroll to Top
    </IonButton>
  );
};

export default ScrollToTop;
