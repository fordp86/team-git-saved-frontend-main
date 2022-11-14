import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Tasks from "./pages/Tasks";
import Welcome from "./pages/Welcome";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./pages/App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SignUpChild from "./pages/SignUpChild";
import { DiscussionProvider } from "./contexts/DiscussionProvider";
import Rewards from "./pages/Rewards";
import { TaskProvider } from "./contexts/TaskProvider";
import EditTask from "./components/EditTask";

import { UserProvider } from "./contexts/UserProvider";
import EditProfile from "./components/EditProfile";
import Profile from "./pages/Profile";
import { RewardsProvider } from "./contexts/RewardsProvider";
import { HouseholdProvider } from "./contexts/HouseholdProvider";
import { QuoteProvider } from "./contexts/QuoteProvider";
import EditReward from "./components/EditReward";

import AppMenu from "./components/AppMenu";
import MeetTheDevs from "./pages/MeetTheDevs";
import EditDiscussion from "./components/EditDiscussion";
import DiscussionBoard from "./pages/DiscussionBoard";
// import AddPhotos from "./pages/AddPhotos";

setupIonicReact();
const App: React.FC = () => (
  <UserProvider>
    <IonApp>
      <IonReactRouter>
        <IonMenu side="end" menuId="first" contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <AppMenu />
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="main">
          <Route exact path="/tasks">
            <UserProvider>
              <TaskProvider>
                <Tasks />
              </TaskProvider>
            </UserProvider>
          </Route>
          <Route path="/tasks/:id">
            <TaskProvider>
              <EditTask />
            </TaskProvider>
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/devs">
            <MeetTheDevs />
          </Route>
          <Route path="/signup">
            <HouseholdProvider>
              <SignUp />
            </HouseholdProvider>
          </Route>
          <Route path="/signupchild">
            <HouseholdProvider>
              <SignUpChild />
            </HouseholdProvider>
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/profile">
            <RewardsProvider>
              <TaskProvider>
                <Profile />
              </TaskProvider>
            </RewardsProvider>
          </Route>
          <Route path="/users/:id">
            <TaskProvider>
              <EditProfile />
            </TaskProvider>
          </Route>
          <Route path="/rewards">
            <RewardsProvider>
              <Rewards />
            </RewardsProvider>
          </Route>
          <Route path="/rewards/:id">
            <RewardsProvider>
              <Rewards />
            </RewardsProvider>
          </Route>
          <Route path="/rewards/:id">
            <RewardsProvider>
              <EditReward />
            </RewardsProvider>
          </Route>
          <Route path="/discussion">
            <DiscussionProvider>
              <DiscussionBoard />
            </DiscussionProvider>
          </Route>
          <Route path="/discussion/:id">
            <DiscussionProvider>
              <EditDiscussion />
            </DiscussionProvider>
          </Route>
          {/* <Route exact path="/addPhotoOfTask">
          <AddPhotos/>
        </Route> */}
          <Route exact path="/">
            <QuoteProvider>
              <Redirect to="/welcome" />
            </QuoteProvider>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </UserProvider>
);

export default App;
