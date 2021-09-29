import './App.css';
import { Component, useEffect, useRef } from 'react';
import { Container } from '@material-ui/core';
import DemandServices from './pages/DemandServices';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import RegisterScreen from './pages/RegisterScreen';
import AccountInfoScreen from './pages/PatientSignUp/AccountInfo';
import MedicalInfoScreen from './pages/PatientSignUp/MedicalInfoScreen';
import DepandentScreen from './pages/PatientSignUp/DepandentScreen';
import InsuranceScreen from './pages/PatientSignUp/InsuranceScreen';
import SignInScreen from './pages/SignInScreen';
import ManageUserScreen from './pages/ManageUserScreen';
import DoctorWelcome from './pages/DoctorWelcomeScreen';
import JoiningScreen from './pages/JoiningScreen';
import DocAccountInfoScreen from './pages/DoctorSignUp/DocAccountInfoScreen';
import DocServicesScreen from './pages/DoctorSignUp/DocServicesScreen';
import DocSchedule from './pages/DoctorSignUp/DocScheduleScreen';
import ForgotPsScreen from './pages/ForgotPsScreen';
import ProtectedRoute from './components/ProtectedRoute';
import ChatWelcomeScreen from './pages/ChatWelcomeScreen';
import ChimeMeetingScreen from './pages/ChimeMeetingScreen';
import FeedBackScreen from './pages/FeedBackScreen';
import ChatInQueueScreen from './pages/ChatInQueueScreen';
import SeeADoctorPatient from './pages/SeeADoctorPatient';
import MenuScreen from './pages/MenuScreen';
import Calendar from './pages/Calendar';
import ProfilePage from './pages/ProfilePage';
import ContactsPage from './pages/ContactsPage';
import EMRPage from './pages/EMRPage';
import Billing from './pages/Billing';
import Messages from './pages/MessagesScreen/Messages';
import TwoFactorScreen from './pages/TwoFactorScreen';
import FileUploadScreen from './pages/FileUploadScreen';
import Claims from './pages/Claims';
import ResetPassword from './pages/ResetPassword';
import RolesAndPreviliges from './pages/RolesAndPreviliges';
import UserProfilePage from './pages/UserProfilePage';
import Widget from 'rasa-webchat';
import { CHATBOT_URL_PATH } from './config/uriConfig';

const App = () => {

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      try {
        document.querySelector(".rw-send").click();
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <Container style={{ width: '100%' }} /* maxWidth="md" */ /* style={{marginLeft: 100, marginRight: 100, width: 'calc(100% - 200px)'}} */ className="App">
      <div onKeyDown={handleKeyDown}>
        <Widget
          initPayload={"/get_started"}
          socketUrl={CHATBOT_URL_PATH}
          socketPath={"/socket.io/"}
          customData={{ "language": "en" }}
          title={"AltHealth Chatbot"}
        />
      </div>
      <BrowserRouter>
        <Switch>
          <Route path="/reg" component={RegisterScreen} />
          <Route path="/acc" component={AccountInfoScreen} />
          <Route path="/docAccountInfo" exact component={DocAccountInfoScreen} />
          <Route path="/Medical" exact >
            <ProtectedRoute Pages={MedicalInfoScreen} />
          </Route>
          <Route path="/signIn" component={SignInScreen} />
          <Route path="/resetPassword" component={ResetPassword} />
          <Route path="/twoFactor" component={TwoFactorScreen} />
          <Route path="/docWelcome"  >
            <ProtectedRoute Pages={DoctorWelcome} />
          </Route>
          <Route path="/joining"  >
            <ProtectedRoute Pages={JoiningScreen} />
          </Route>
          <Route path="/Depandent" exact  >
            <ProtectedRoute Pages={DepandentScreen} />
          </Route>
          <Route path="/Insurance" exact  >
            <ProtectedRoute Pages={InsuranceScreen} />
          </Route>
          <Route path="/Manageuser" exact>
            <ProtectedRoute Pages={ManageUserScreen} />
          </Route>
          <Route path="/docServices" exact >
            <ProtectedRoute Pages={DocServicesScreen} />
          </Route>
          <Route path="/docSchedule" component={DocSchedule} exact>
            <ProtectedRoute Pages={DocSchedule} />
          </Route>
          <Route path="/forgotPassword" exact component={ForgotPsScreen} />
          <Route path="/chatWelcome" exact>
            <ProtectedRoute Pages={ChatWelcomeScreen} />
          </Route>
          <Route path="/chimeMeeting" exact>
            <ProtectedRoute Pages={ChimeMeetingScreen} />
          </Route>
          <Route path="/feedback" exact>
            <ProtectedRoute Pages={FeedBackScreen} />
          </Route>
          <Route path="/seeADoctorPatient" exact>
            <ProtectedRoute Pages={SeeADoctorPatient} />
          </Route>
          <Route path="/chatInQueue" exact>
            <ProtectedRoute Pages={ChatInQueueScreen} />
          </Route>
          <Route path="/menuScreen" exact >
            <ProtectedRoute Pages={MenuScreen} />
          </Route>
          <Route path="/calendar" exact >
            <ProtectedRoute Pages={Calendar} />
          </Route>
          <Route path="/ProfilePage" exact >
            <ProtectedRoute Pages={ProfilePage} />
          </Route>
          <Route path="/ContactsPage" exact >
            <ProtectedRoute Pages={ContactsPage} />
          </Route>
          <Route path="/fileUpload" exact >
            <ProtectedRoute Pages={FileUploadScreen} />
          </Route>
          <Route path="/EMRPage" exact >
            <ProtectedRoute Pages={EMRPage} />
          </Route>
          <Route path="/Billing" exact >
            <ProtectedRoute Pages={Billing} />
          </Route>
          <Route path="/Claims" exact >
            <ProtectedRoute Pages={Claims} />
          </Route>
          <Route path="/messages" exact >
            <ProtectedRoute Pages={Messages} />
          </Route>
          <Route path="/RolesAndPreviliges" exact >
            <ProtectedRoute Pages={RolesAndPreviliges} />
          </Route>
          <Route path="/UserProfilePage" exact >
            <ProtectedRoute Pages={UserProfilePage} />
          </Route>
          <Route path="/" component={DemandServices} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;