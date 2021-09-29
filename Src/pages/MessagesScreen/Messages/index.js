import { useStyles } from "./styles";
import { useEffect, useState } from "react";
import { Grid, Typography, Box, Button, TextField } from "@material-ui/core";
import FormButton from "../../../components/FormButton";
import Header from "../../../components/Header";
import UserSelection from "../../../components/UserSelection";
import ProfilePictureComponent from "../../../components/ProfilePictureComponent";
import SearchBox from "../../../components/SearchBox";
import PageTitle from "../../../components/PageTitle";
import { URL_PATH } from "../../../config/uriConfig";
import { dynamicConfig } from "../../../config/dynamicConfig";
import { /* TENANT_ID, */ getTenantFromUrl } from "../../../config/TenantConfig";
import { Colors } from "../../../styles";
import Contact from "../Contacts";
import FullMessage from "../FullMessage";
import {
  getRequest,
  updateRequest,
  postRequest,
} from "../../../common/fetchRequest";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearCalendarData } from "../../../ducks/ScheduleDuck/action";
const TENANT_ID = getTenantFromUrl();
const Messages = ({ clearCalendarData }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [lastMessages, setLastMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [composeMessageContent, setComposeMessageContent] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const userType = localStorage.getItem("userType");
  const [userTypes, setUserTypes] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [showComposeBox, setShowComposeBox] = useState(false);
  const [maxLimitReached, setMaxLimitReached] = useState(false);
  const [notAllowed, setNotAllowed] = useState(false);
  const location = useLocation();

  const { state } = location;
  useEffect(() => {
    // if (state !== null && state !== undefined) {
    //   setSelectedUserType(state[1]);
    // }
    let usertypes =
      dynamicConfig[TENANT_ID]?.chatOptions[userType]?.contactsUserTypes;
    if (usertypes) {
      setUserTypes(usertypes);
    }
    if (userType === "PATIENT") {
      validateComposeEmailPrivileges();
    } else {
      setShowComposeBox(true);
    }

    return () => {
      // This will clear selcted doctor/ selected patient and selected admin from reducer to avoid
      // issue with newly selected user and previous selected user.
      clearCalendarData();
    };
  }, []);

  const validateComposeEmailPrivileges = async () => {
    const patientId = await localStorage.getItem("user_Id");
    const URL = `patient/${patientId}/validateComposeEmailPrivileges?tenant=${TENANT_ID}`;
    const response = await getRequest(URL, true);
    if (response.ok) {
      setShowComposeBox(true);
    } else {
      setShowComposeBox(false);
    }
  };

  const getLastMessages = async () => {
    setContactsLoading(true);
    setSelectedContact(null);
    setAllMessages([]);
    let name = searchTerm;
    if (searchTerm === null) {
      name = "";
    }
    let sysUserId = localStorage.getItem("userId");
    let URL = URL_PATH;
    if (userType === "SERVICE_PROVIDER") {
      URL = `serviceProvider/${sysUserId}/contactsWithLastMessages?tenant=${TENANT_ID}&name=${name}&userType=${selectedUserType}`;
    } else if (userType === "PATIENT") {
      URL = `patient/${sysUserId}/contactsWithLastMessages?tenant=${TENANT_ID}&name=${name}&userType=${selectedUserType}`;
    } else if (userType === "ADMIN") {
      URL = `admin/${sysUserId}/contactsWithLastMessages?tenant=${TENANT_ID}&name=${name}&userType=${selectedUserType}`;
    }
    let response = await getRequest(URL, true);
    setContactsLoading(false);
    if (response.ok) {
      try {
        const data = await response.json();
        console.log("Last Messages: " + JSON.stringify(data));
        setLastMessages(data);
        if (state !== null && state !== undefined) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].userId === state[0].userId) {
              setSelectedContact(data[i]);
              let temp = array_move(data, i, 0);
              setLastMessages(temp);
            }
          }
        }
      } catch (err) {
        setLastMessages([]);
      }
    } else {

    }
  };

  const getAllMessages = async (contact) => {
    try {
      let selectedContactSysUserId = contact.sysUserId;
      let sysUserId = localStorage.getItem("userId");
      let senderSysUserId;
      let receiverSysUserId;

      if (userType === "SERVICE_PROVIDER") {
        senderSysUserId = sysUserId;
        receiverSysUserId = selectedContactSysUserId;
      } else if (userType === "PATIENT") {
        senderSysUserId = selectedContactSysUserId;
        receiverSysUserId = sysUserId;
      } else {
        senderSysUserId = sysUserId;
        receiverSysUserId = selectedContactSysUserId;
      }
      let URL = `message/sender/${senderSysUserId}/receiver/${receiverSysUserId}/getAll?tenant=${TENANT_ID}&requireBothInboxOutbox=true`;
      let response = await getRequest(URL, true);
      const data = await response.json();
      if (response.ok) {
        setAllMessages(data);
        setTimeout(() => {
          var objDiv = document.getElementById("chatWindow");
          if (objDiv !== null) {
            objDiv.scrollTop = objDiv.scrollHeight;
          }
        }, 1000);
        console.log("data: " + JSON.stringify(data));
        for (let message of data) {
          if (message.readStatus !== "Y") {
            updateReadStatus(message.receiverSysUserId, message.messageID);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateReadStatus = async (receiverSysUserId, messageId) => {
    let URL = `message/${receiverSysUserId}/${messageId}?tenant=${TENANT_ID}&readStatus=Y&sender=false`;
    const response = await updateRequest(URL, false);
  };

  const selectContactHandler = (contact) => {
    setSelectedContact(contact);
  };

  const handleSend = async () => {
    try {
      if (!maxLimitReached) {
        setSendingMessage(true);
        let sysUserId = localStorage.getItem("userId");
        let authorizationToken = localStorage.getItem("token");

        let formData = new FormData();
        formData.append("body", composeMessageContent);
        formData.append("receiverSysUserId", selectedContact.sysUserId);

        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
          },
          body: formData,
        };
        let URL = `message/${sysUserId}?tenant=${TENANT_ID}`;
        let response = await postRequest(URL, null, true, requestOptions);
        setSendingMessage(false);
        if (response.ok) {
          const data = await response.json();
          let updatedAllMessages = [...allMessages, data];
          setAllMessages(updatedAllMessages);
          setTimeout(() => {
            var objDiv = document.getElementById("chatWindow");
            if (objDiv !== null) {
              objDiv.scrollTop = objDiv.scrollHeight;
            }
          }, 1000);
          updateLeftPanel(composeMessageContent);
          setComposeMessageContent("");
        } else if (response.status === 423) {
          setMaxLimitReached(true);
          setTimeout(() => {
            var objDiv = document.getElementById("chatWindow");
            if (objDiv !== null) {
              objDiv.scrollTop = objDiv.scrollHeight;
            }
          }, 1000);
        } else if (response.status === 405) {
          setNotAllowed(true);
          setTimeout(() => {
            var objDiv = document.getElementById("chatWindow");
            if (objDiv !== null) {
              objDiv.scrollTop = objDiv.scrollHeight;
            }
          }, 1000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateLeftPanel = (snippet) => {
    let sentMessage = selectedContact;
    sentMessage.messageCreatedDate = new Date();
    sentMessage.messageId = "";
    sentMessage.readstatus = "Y";
    sentMessage.snippet = snippet;
    let updatedLastMessages = [...lastMessages, sentMessage];
    setLastMessages(updatedLastMessages);
  };

  const onSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    if (searchTerm !== null) {
      getLastMessages();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (selectedContact !== null) {
      getAllMessages(selectedContact);
    }
  }, [selectedContact]);

  useEffect(() => {
    if (selectedUserType !== null) {
      getLastMessages();
      setMaxLimitReached(false);
      setNotAllowed(false);
    }
  }, [selectedUserType]);

  useEffect(() => {
    if (allMessages.length !== 0) {
      let index = lastMessages.findIndex(
        (item) => item.userId === selectedContact.userId
      );
      let lastMessagesTemp = [...lastMessages];
      lastMessagesTemp[index].readstatus = "Y";
      setLastMessages(lastMessagesTemp);
    }
  }, [allMessages]);

  const getContactDetails = () => {
    let details = "";
    if (selectedContact.addressline1 !== null) {
      details += selectedContact.addressline1;
    }
    if (selectedContact.addressline2 !== null) {
      details += selectedContact.addressline2;
    }
    if (selectedContact.addressline3 !== null) {
      details += selectedContact.addressline3;
    }
    if (selectedContact.city !== null) {
      details += selectedContact.city;
    }
    if (selectedContact.countrycode !== null) {
      details += selectedContact.countrycode;
    }
    if (selectedContact.zipcode !== null) {
      details += selectedContact.zipcode;
    }
    return details;
  };

  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  }

  const onKeyPressHandler = e => {
    // e.preventDefault();
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Box>
      <Header />
      <PageTitle title={t("Messages")} subTitle="Some description" />
      <Grid container className={classes.mainContainer} spacing={2}>
        <Grid item sm={4} xs={12} className={classes.rightBorder}>
          <SearchBox onSearch={onSearch} />
          <Box className={classes.contactList}>
            {!contactsLoading ? (
              lastMessages.length !== 0 &&
              lastMessages.map((item, index) => {
                return (
                  <Contact
                    isSelected={selectedContact && selectedContact === item}
                    lastMessageContact={item}
                    readstatus={
                      item.messageId !== null &&
                        item.sysUserId === item.senderSysUserId
                        ? item.readstatus
                        : "No"
                    }
                    selectContact={() =>
                      selectContactHandler(item)
                    }
                  />
                );
              })
            ) : (
              <CircularProgress style={{ color: Colors.PRIMARY }} />
            )}
          </Box>
          <UserSelection
            propsSelectedUserType={state !== undefined ? state[1] : null}
            propsOnSelectUserType={setSelectedUserType}
          />
        </Grid>
        <Grid
          item
          sm={8}
          xs={12}
          className={classes.form}
        >
          {selectedContact ? (
            <>
              <Box className={classes.currentContactHeader}>
                <div>
                  <ProfilePictureComponent
                    firstName={selectedContact.firstname}
                    lastName={selectedContact.lastname}
                    size={35}
                    fontSize={12}
                  />
                </div>
                <Box className={classes.chatHeaderRightBox}>
                  <Typography align="left" className={classes.chatHeaderName}>
                    {selectedContact.firstname + " " + selectedContact.lastname}
                  </Typography>
                  {
                    <>
                      <Typography
                        align="left"
                        className={classes.chatHeaderSubText}
                      >
                        {getContactDetails()}
                      </Typography>
                    </>
                  }
                </Box>
              </Box>

              <Box id="chatWindow" className={classes.chatWindow}>
                {allMessages.length !== 0 &&
                  allMessages.map((item, index) => {
                    return (
                      <FullMessage
                        message={item}
                        type={
                          localStorage.getItem("userId") == item.senderSysUserId
                            ? "sent"
                            : "recieived"
                        }
                      />
                    );
                  })}
                {maxLimitReached && (
                  <Typography className={classes.maxLimitReachedText}>
                    {t("messageMaxLimit")}
                  </Typography>
                )}
                {notAllowed && (
                  <Typography className={classes.maxLimitReachedText}>
                    {t("messagingNotAllowed")}
                  </Typography>
                )}
              </Box>

              {showComposeBox && (
                <Box>
                  <Box className={classes.composeWrapper}>
                    <Box className={classes.composeTextBox}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        value={composeMessageContent}
                        onChange={(MessageContent) => {
                          setComposeMessageContent(MessageContent.target.value);
                        }}
                        variant="outlined"
                        disabled={maxLimitReached}
                        onKeyPress={onKeyPressHandler}
                      />
                    </Box>
                  </Box>
                  <Box className={classes.ButtonsContainer}>
                    <FormButton
                      title={t("cancel")}
                      onClick={() => {
                        setComposeMessageContent("");
                      }}
                      buttonStyle={{ width: "12%", marginRight: 6 }}
                      loading={sendingMessage}
                      variant="outlined"
                      noBorder={true}
                    />
                    <FormButton
                      title={t("send")}
                      onClick={handleSend}
                      buttonStyle={{ width: "12%" }}
                      loading={sendingMessage}
                    />
                  </Box>
                </Box>
              )}
            </>
          ) :
            <Box className={classes.emptyForm} />
          }
        </Grid>
      </Grid>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  propsSelectedDoctor: state.ScheduleDuck.selectedDoctor,
  propsSelectedPatient: state.ScheduleDuck.selectedPatient,
});

export default connect(mapStateToProps, { clearCalendarData })(Messages);
