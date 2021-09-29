import { useState, useEffect } from "react";
import CreateAppointment from "../../../components/CalendarComponents/CreateAppointment";
import ScheduleCalendar from "../../../components/CalendarComponents/ScheduleCalendar";
import { TENANT_ID } from "../../../config/TenantConfig";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { useStyles } from "../styles";
import { Colors } from "../../../styles";
import { getRequest, postRequest } from "../../../common/fetchRequest";
import { useTranslation } from "react-i18next";
import FormButton from '../../../components/FormButton';
import SP_ScheduleForm from '../../../components/SpForms/SP_ScheduleForm';
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

const SpView = ({ userType, propsType }) => {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([]);
  const [scheduleView, setScheduleView] = useState(false);
  
  const { t } = useTranslation();
  useEffect(() => {
    getAvailableSlots();
  }, []);

  useEffect(() => {
    if (
      propsType === "DELETE_APPOINTMENT_SUCCESS" ||
      propsType === "CREATE_APPOINTMENT_SUCCESS"
    ) {
      getAvailableSlots();
    }
  }, [propsType]);

  const getAvailableSlots = async () => {
    let sysUserId = localStorage.getItem("userId");
    let URL = `serviceProvider/${sysUserId}/slots?requireAllSlots=false&tenant=${TENANT_ID}`;
    let response = await getRequest(URL, true);
    if (response.ok) {
      const data = await response.json();
      getAppointments(data);
    }
  };

  const getAppointments = async (availableSlots) => {
    let userId = localStorage.getItem("user_Id");
    let userType = localStorage.getItem("userType");
    let URL = "";
    if (userType === "SERVICE_PROVIDER") {
      URL = `appointment/serviceProvider/${userId}?tenant=${TENANT_ID}`;
    } else {
      URL = `appointment/patient/${userId}?tenant=${TENANT_ID}`;
    }
    let response = await getRequest(URL, true);
    if (response.ok) {
      const data = await response.json();
      console.log("appointment response: " + JSON.stringify(data));
      let formattedAppointments = [];
      if (data) {
        let combinedData = availableSlots.concat(data);
        console.log("combinedData: " + JSON.stringify(combinedData));
        for (let i = 0; i < combinedData.length; i++) {
          if (combinedData[i].appointmentId !== null) {
            let date = combinedData[i].actualStartTime.substring(0, 10);
            let title = t("booked");
            let color = Colors.PRIMARY;
            if (
              combinedData[i].appointmentStatus === "CONSULTATION_COMPLETED"
            ) {
              title = t("completed");
              color = "#ff0042";
            }
            let eventObj = {
              title: title,
              date: date,
              id: combinedData[i].appointmentId,
              serviceProviderId: combinedData[i].serviceProviderId,
              availabilitySlotIds: combinedData[i].availabilitySlotIds,
              start: combinedData[i].actualStartTime,
              end: combinedData[i].actualEndTime,
              extendedProps: combinedData[i],
              color: color,
            };
            formattedAppointments.push(eventObj);
          } else {
            let date = combinedData[i].slotStartTime.substring(0, 10);
            let title = t("available");
            let eventObj = {
              title: title,
              date: date,
              id: combinedData[i].appointmentId,
              serviceProviderId: combinedData[i].serviceProviderAvailabilityId,
              availabilitySlotIds:
                combinedData[i].serviceProviderAvailabilitySlotId,
              start: combinedData[i].slotStartTime,
              end: combinedData[i].slotEndTime,
              extendedProps: combinedData[i],
              color: "#00b228",
            };
            formattedAppointments.push(eventObj);
          }
        }
        console.log(
          "formattedAppointments: " + JSON.stringify(formattedAppointments)
        );
      }
      setAppointments(formattedAppointments);
    }
  };

  const toggleScheduleAppointmentView = () => {
    if (!scheduleView) {
      getScheduleData();
    } else {
      getAvailableSlots();
    }
    setScheduleView(!scheduleView);
  }

  let intialScheduleState = {
    availabilityType: "VIRTUAL",
    office: "",
    isWorkingPublicHoliday: "no",
    isRecurring: "no",
    startDate: new Date().toISOString().substring(0, 10),
    startTime: "",
    endTime: "",
    recurringEndDate: "",
    selectedDays: [],
    startTimeError: "",
    endTimeError: "",
    selectedDaysError: "",
    recurringEndDateError: "",
    checkedItem: [
      {
        key: "Sun",
        value: "SUNDAY",
        selected: false,
      },
      {
        key: "Mon",
        value: "MONDAY",
        selected: false,
      },
      {
        key: "Tue",
        value: "TUESDAY",
        selected: false,
      },
      {
        key: "Wed",
        value: "WEDNESDAY",
        selected: false,
      },
      {
        key: "Thu",
        value: "THURSDAY",
        selected: false,
      },
      {
        key: "Fri",
        value: "FRIDAY",
        selected: false,
      },
      {
        key: "Sat",
        value: "SATURDAY",
        selected: false,
      },
    ],
  };
  const [successAlertBarError, setSuccessAlertBar] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const updateScheduleState = (field, value) => {
    setScheduleState((previous) => ({ ...previous, [field]: value }));
  };
  const [scheduleState, setScheduleState] = useState(intialScheduleState);
  const updateScheduleDays = (day) => {
    let currentDays = [...scheduleState.selectedDays];
    if (currentDays.indexOf(day.value) === -1) {
      currentDays.push(day.value);
      updateScheduleState("selectedDays", currentDays);
    } else {
      currentDays.splice(currentDays.indexOf(day.value), 1);
      updateScheduleState("selectedDays", currentDays);
    }
  };

  const [availabilities, setAvailabilities] = useState([]);
  const [addingAvailability, setAddingAvailability] = useState(true);
  const [addAvailabilityFormError, setAddAvailabilityFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const getScheduleData = async () => {
    setLoading(true);
    const user_Id = localStorage.getItem('user_Id');
    var a = new Date().getTimezoneOffset();
    let currentYear = new Date().getFullYear();
    let fromDate = `${currentYear}-01-01`;
    let toDate = `${currentYear}-12-31`;
    var timrZoneOffset = -Math.round(a / 60) + ":" + -(a % 60);
    let URL = `serviceProvider/${user_Id}/schedule?tenant=${TENANT_ID}&timeZoneId=GMT%2B${timrZoneOffset}&fromDateStr=${fromDate}&toDateStr=${toDate}`;
    let response = await getRequest(URL, true);
    if (response.ok) {
      const data = await response.json();
      console.log("SP Availability: " + JSON.stringify(data));
      setLoading(false);
      let availabilities = [];
      for (let i = 0; i < data.length; i++) {
        let timeMaps = Object.values(data[i].timeDetailsMap);
        for (let j = 0; j < timeMaps.length; j++) {
          let obj = data[i];
          obj = Object.assign({}, obj, timeMaps[j]);
          obj.start = obj.startTime;
          obj.end = obj.endTime;
          let availabilityType = obj.availabilityType === 'BOTH' ? 'VIRTUAL and PHYSICAL both' : obj.availabilityType;
          obj.title = `Available ${availabilityType} ${obj.days !== null ? "on " + obj.days : ""
            }`;
          obj.advancedTitle = "&#10004;";
          obj.color = Colors.PRIMARY;
          obj.extendedProps = data[i];
          availabilities.push(obj);
        }
      }
      setAvailabilities(availabilities);
      console.log("availabilities grouped: " + JSON.stringify(availabilities));
    }
  };

  const addAvailability = async (closeModalFunction) => {
    setAddingAvailability(true);
    setAddAvailabilityFormError('');
    let hasError = false;
    if (scheduleState.startTime === "") {
      updateScheduleState("startTimeError", "Please select the start time.");
      hasError = true;
    } else {
      updateScheduleState("startTimeError", "");
    }
    if (scheduleState.endTime === "") {
      updateScheduleState("endTimeError", "Please select the end time.");
      hasError = true;
    } else {
      updateScheduleState("endTimeError", "");
    }
    if (scheduleState.isRecurring === "yes") {
      if (scheduleState.selectedDays.length === 0) {
        updateScheduleState(
          "selectedDaysError",
          "Please select the days for the recurring."
        );
        hasError = true;
      } else {
        updateScheduleState("selectedDaysError", "");
      }
      if (scheduleState.recurringEndDate === "") {
        updateScheduleState(
          "recurringEndDateError",
          "Please select the end date of recurring."
        );
        hasError = true;
      } else {
        updateScheduleState("recurringEndDateError", "");
      }
    } else {
      updateScheduleState("selectedDaysError", "");
      updateScheduleState("recurringEndDateError", "");
    }
    if (hasError) {
      setAddingAvailability(false);
    } else {
      setAddingAvailability(true);
      const startTimeStamp = await dateTimeToTimestamp(
        scheduleState.startDate,
        scheduleState.startTime
      );
      const endTimeStamp = await dateTimeToTimestamp(
        scheduleState.startDate,
        scheduleState.endTime
      );
      const recurringEndTimeStamp = await dateTimeToTimestamp(
        scheduleState.recurringEndDate,
        "23:59"
      );
      let body = {
        tenant: TENANT_ID,
        startDateTime: startTimeStamp,
        endDateTime: endTimeStamp,
        availabilityType: scheduleState.availabilityType,
        rRule: null,
        rDate: null,
        rEndTime: recurringEndTimeStamp,
        exDate: null,
        isAvailable: true,
        isRecurring: scheduleState.isRecurring === "yes" ? true : false,
        timeZone: "UTC",
        virtualLinkRef: "skype",
        isWorkingPublicHoliday: scheduleState.isWorkingPublicHoliday
          ? true
          : false,
        officeLocationId: null,
        days:
          scheduleState.selectedDays.length !== 0
            ? scheduleState.selectedDays
            : null,
      };
      console.log('schedule add: ' + JSON.stringify(body))
      body = JSON.stringify(body);
      let sysUserId = localStorage.getItem("userId");
      const URL = `serviceProvider/${sysUserId}/availability?tenant=${TENANT_ID}`;
      const response = await postRequest(URL, body, true);
      setAddingAvailability(false);
      if (response.ok) {
        setSuccessAlertBar(true);
        setSuccessMessage("Schedule added successfully");
        closeModalFunction();
        //Setting schedule form to initial state.
        setScheduleState(intialScheduleState);
        getScheduleData();
      } else {
        if (response.status === 400) {
          // If schedule is being added on same slots(slots are getting overlapped with already created ones.)
          setAddAvailabilityFormError("We found some booked slots are getting overlapped, please try with different slot.");
        }
      }
    }
  };

  const dateTimeToTimestamp = (date, time) => {
    var dateString = `${date} ${time}`,
      dateTimeParts = dateString.split(" "),
      timeParts = dateTimeParts[1].split(":"),
      dateParts = dateTimeParts[0].split("-"),
      date;

    date = new Date(
      dateParts[0],
      parseInt(dateParts[1], 10) - 1,
      dateParts[2],
      timeParts[0],
      timeParts[1]
    );
    return date.getTime();
  };

  const clearScheduleForm = () => {
    setScheduleState(intialScheduleState);
    setAddAvailabilityFormError('');
  };

  const alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlertBar(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={!scheduleView ? 8 : 12}>
        <div className={classes.toggleButton} style={{ marginBottom: 12, marginLeft: 0 }}>
          <FormButton
            title={!scheduleView ? 'Show Schedule' : 'Show Appointments'}
            onClick={toggleScheduleAppointmentView}
          />
        </div>
        {
          !scheduleView ?
            <div className={classes.title}>{t('calendarTitle')}</div>
            :
            null
        }
        {
          !scheduleView ?
            <ScheduleCalendar appointments={appointments} userType={userType} />
            :
            <SP_ScheduleForm
              propsUpdateState={updateScheduleState}
              updateDays={updateScheduleDays}
              scheduleState={scheduleState}
              availabilities={availabilities}
              onDeleteAvailability={getScheduleData}
              onAddSchedule={addAvailability}
              clearForm={clearScheduleForm}
              updating={addingAvailability}
              formError={addAvailabilityFormError}
            />
        }
      </Grid>
      {
        !scheduleView ?
          <Grid item xs={12} sm={4} style={{ paddingTop: "7%" }}>
            <CreateAppointment userType={userType} />
          </Grid>
          :
          null
      }

      <Snackbar
        open={successAlertBarError}
        autoHideDuration={3000}
        onClose={alertClose}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  propsSelectedDoctor: state.ScheduleDuck.selectedDoctor,
  propsType: state.ScheduleDuck.type,
});

export default connect(mapStateToProps)(SpView);
