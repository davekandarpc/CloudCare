import { useState, useEffect } from "react";
import { useStyles } from "./styles";
import Header from "../../components/Header";
import FormButton from "../../components/FormButton";
import { useHistory } from "react-router-dom";
import { TENANT_ID } from "../../config/TenantConfig";
import { dynamicConfig } from "../../config/dynamicConfig";
import { Colors } from "../../styles";
import { Grid, div, Box } from "@material-ui/core";
import RegisterForm from "../../components/PatientForms/RegisterForm";
import PT_AccountInfoForm from "../../components/PatientForms/PT_AccountInfoForm";
import PT_MedicalInfoForm from "../../components/PatientForms/PT_MedicalInfoForm";
import PT_DependantForm from "../../components/PatientForms/PT_DependantForm";
import PT_PaymentForm from "../../components/PatientForms/PT_PaymentForm";
import SP_AccountInfoForm from "../../components/SpForms/SP_AccountInfoForm";
import SP_ScheduleForm from "../../components/SpForms/SP_ScheduleForm";
import SP_ServicesForm from "../../components/SpForms/SP_ServicesForm";
import AdminProfileForm from "../../components/AdminForms/AdminProfileForm";
import {
  getRequest,
  updateRequest,
  postRequest,
} from "../../common/fetchRequest";
import { useTranslation } from "react-i18next";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));
const ProfilePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [userId, setUserId] = useState("");
  const [patientData, storePatientData] = useState("");
  const [doctorData, storeDoctorData] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [menu, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [addAvailabilityFormError, setAddAvailabilityFormError] = useState('');

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    initial: "",
    salutation: "",
    CountryCode: "",
    address: "",
    address2: "",
    city: "",
    postalCode: "",
    province: "",
    phoneNumber: "",
    patientName: "",
    patientsDropdown: false,
    primaryLanguage: "",
    secondaryLanguage: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelation: "",
  });

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
  const [scheduleState, setScheduleState] = useState(intialScheduleState);

  const [successAlertBarError, setSuccessAlertBar] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [scheduleAvailability, setScheduleAvailability] = useState([]);
  const sysUserId = localStorage.getItem("userId");
  const [adminProfile, setAdminProfile] = useState(null);

  const updateState = (field, value) => {
    setState((previous) => ({ ...previous, [field]: value }));
  };

  const updateScheduleState = (field, value) => {
    setScheduleState((previous) => ({ ...previous, [field]: value }));
  };

  useEffect(() => {
    let user_type = localStorage.getItem("userType");
    if (user_type !== null) {
      setUserType(user_type);
      if (user_type === "ADMIN") {
        getAdminProfile();
      } else {
        getProfile();
      }
      let MENU = dynamicConfig[TENANT_ID]?.signUp[user_type]?.stepper;
      if (MENU) {
        setMenu(MENU);
      }
      if (dynamicConfig[TENANT_ID]?.signUp[user_type]?.stepper[0]) {
        setSelectedMenu(dynamicConfig[TENANT_ID].signUp[user_type].stepper[0]);
      }
    }
  }, []);

  const getProfile = async () => {
    let userType = localStorage.getItem("userType");
    setLoading(true);
    let URL = "";
    if (userType === "SERVICE_PROVIDER") {
      URL = URL + `serviceProvider/${sysUserId}?tenant=${TENANT_ID}`;
    } else if (userType === "PATIENT") {
      URL = URL + `patient/${sysUserId}?tenant=${TENANT_ID}`;
    } else if (userType === "ADMIN") {
      URL = URL + `admin/${sysUserId}?tenant=${TENANT_ID}`;
    }
    let response = await getRequest(URL, true);
    setLoading(false);
    if (response) {
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("userType");
          localStorage.removeItem("userId");
          localStorage.removeItem("user_Id");
          localStorage.removeItem("token");
          history.push({ pathname: "/signIn", search: `?tenant=${TENANT_ID}` });
        }
        return;
      }
      const data = await response.json();
      if (userType === "SERVICE_PROVIDER") {
        setDoctorData(data);
        storeDoctorData(data);
      } else {
        setPatientData(data);
        storePatientData(data);
      }
      console.log("RESPONSE FROM SERVER => " + JSON.stringify(data));
    }
  };

  const getAdminProfile = async () => {
    setLoading(true);
    let URL = `user/${sysUserId}/profile?tenant=${TENANT_ID}`;
    let response = await getRequest(URL, true);
    setLoading(false);
    if (response) {
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("userType");
          localStorage.removeItem("userId");
          localStorage.removeItem("user_Id");
          localStorage.removeItem("token");
          history.push({ pathname: "/signIn", search: `?tenant=${TENANT_ID}` });
        }
        return;
      }
      const data = await response.json();
      setAdminData(data);
      console.log("Admin profile: " + JSON.stringify(data));
    }
  };

  const setDoctorData = (data) => {
    setUserId(data.serviceProviderId);
    updateState("salutation", data.salutation);
    updateState("firstName", data.firstName);
    updateState("lastName", data.lastName);
    updateState("address", data.addressLine1);
    updateState("address2", data.addressLine2);
    updateState("postalCode", data.postalZipCode);
    updateState("province", data.spRegProvince);
    updateState("CountryCode", data.countryCode);
    updateState("phoneNumber", data.mobilePhone);
    updateState("primaryLanguage", data.primaryLang);
    updateState("secondaryLanguage", data.secondaryLang);
    updateState("dob", data.dateOfBirth);
    updateState("city", data.city);
  };

  const setPatientData = (data) => {
    setUserId(data.patientId);
    updateState("salutation", data.salutation);
    updateState("firstName", data.firstName);
    updateState("middleName", data.middleName);
    updateState("lastName", data.lastName);
    updateState("address", data.addresses[0].addressDetail.addressLine1);
    updateState("address2", data.addresses[0].addressDetail.addressLine2);
    updateState("city", data.addresses[0].addressDetail.city);
    updateState("postalCode", data.addresses[0].addressDetail.zipCode);
    updateState(
      "province",
      data.addresses[0].addressDetail.stateProvinceDescription
    );
    updateState("CountryCode", data.addresses[0].addressDetail.countryCode);
    updateState("phoneNumber", data.cellPhoneNum);
    updateState("dob", data.dateOfBirth);
    updateState("emergencyContactName", data.emergencyContactName);
    updateState("emergencyContactNumber", data.emergencyContactPhoneNum);
    updateState("emergencyContactRelation", data.emergencyContactRelation);
  };

  const setAdminData = (data) => {
    updateState("salutation", data.salutation);
    updateState("firstName", data.firstName);
    updateState("middleName", data.middleName);
    updateState("lastName", data.lastName);
    updateState("phoneNumber", data.authPhoneNumber);
    updateState("dob", data.dateOfBirth);
    setAdminProfile(data);
  };

  const toggleEditSave = () => {
    setdisabled(!disabled);
    if (!disabled) {
      if (userType === "ADMIN") {
        updateAdminProfile();
      } else if (selectedMenu === "Schedule") {
        updateSchedule();
      } else if (userType === "PATIENT") {
        updatePatient();
      } else {
        updateDoctor();
        setdisabled(!disabled);
      }
    }
  };

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

  const updateSchedule = async (closeModalFunction) => {
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
      setdisabled(false);
    } else {
      setUpdating(true);
      setdisabled(!disabled);
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
      const URL = `serviceProvider/${sysUserId}/availability?tenant=${TENANT_ID}`;
      const response = await postRequest(URL, body, true);
      if (response.ok) {
        setUpdating(false);
        setSuccessAlertBar(true);
        setSuccessMessage("Schedule added successfully");
        closeModalFunction();
        //Setting schedule form to initial state.
        setScheduleState(intialScheduleState);
        getScheduleData();
      } else {
        if (response.status === 400) {
          // If schedule is being added on same slots(slots are getting overlapped with already created ones.)
          setUpdating(false);
          setAddAvailabilityFormError("We found some booked slots are getting overlapped, please try with different slot.");
        }
      }
    }
  };

  const clearScheduleForm = () => {
    setScheduleState(intialScheduleState);
    setAddAvailabilityFormError('');
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

  const updatePatient = async () => {
    let addressField = document.getElementById("address").value;
    let cityField = document.getElementById("city").value;
    let postalCodeField = document.getElementById("postalCode").value;
    let provinceField = document.getElementById("province").value;
    let countryField = document.getElementById("country").value;
    setUpdating(true);
    let URL = `patient/${userId}?tenant=${TENANT_ID}`;
    let ISO_countryCode = countries.getAlpha2Code(countryField, "en");
    let body = {
      consented: null,
      gender: patientData.gender,
      dateOfBirth: state.dob,
      firstName: state.firstName,
      lastName: state.lastName,
      middleName: state.middleName,
      initials: patientData.initials,
      salutation: state.salutation,
      homePhoneNum: patientData.homePhoneNum,
      cellPhoneNum: state.phoneNumber,
      otherPhoneNum: patientData.homePhoneNum,
      emergencyContactName: state.emergencyContactName,
      emergencyContactPhoneNum: state.emergencyContactNumber,
      emergencyContactRelation: state.emergencyContactRelation,
      relationship: patientData.relationship,
      prefferedLanguage: patientData.prefferedLanguage,
      prefferedLanguage1: patientData.prefferedLanguage1,
      prefferedLanguage2: patientData.prefferedLanguage2,
      prefferedLanguage3: patientData.prefferedLanguage3,
      familyDoctorName: patientData.familyDoctorName,
      familyDoctorId: patientData.familyDoctorId,
      tenant: patientData.tenant,
      addresses: [
        {
          addressType: "PRIMARY",
          addressDetail: {
            addressDetailId: null,
            addressLine1: addressField,
            city: cityField,
            zipCode: postalCodeField,
            addressCode: "PRIMARY",
            addressLine2: "",
            addressLine3: "",
            countryCode: ISO_countryCode,
            tenant: null,
            stateProvinceId:
              patientData.addresses[0].addressDetail.stateProvinceId,
            stateProvinceDescription: provinceField,
          },
          patientDto: null,
          tenant: null,
          addressId: patientData.addresses[0].addressId,
        },
      ],
      stateProvinceCode: provinceField,
      guardian: patientData.guardian,
      patientId: userId,
    };
    body = JSON.stringify(body);
    let response = await updateRequest(URL, body, true);
    setUpdating(false);
    if (response.ok) {
      const data = await response.text();
      console.log("RESPONSE FROM SERVER => " + JSON.stringify(data));
      setSuccessMessage("Your data is updated");
      setSuccessAlertBar(true);
      getProfile();
    }
  };

  const updateDoctor = async () => {
    setUpdating(true);
    let URL = `serviceProvider/${userId}?tenant=${TENANT_ID}`;
    let addressField = document.getElementById("address").value;
    let cityField = document.getElementById("city").value;
    let postalCodeField = document.getElementById("postalCode").value;
    let provinceField = document.getElementById("province").value;
    let countryField = document.getElementById("country").value;
    console.log('countryField: ' + countryField)
    let ISO_countryCode = countries.getAlpha2Code(countryField, "en");
    console.log('ISO_countryCode 1: ' + ISO_countryCode)
    if (countryField === "") {
      ISO_countryCode = state.CountryCode;
    }
    console.log('ISO_countryCode 2: ' + ISO_countryCode)
    let body = {
      serviceProviderId: userId,
      tenantId: null,
      firstName: state.firstName,
      lastName: state.lastName,
      mobilePhone: state.phoneNumber,
      isActive: doctorData.isActive,
      dateOfBirth: state.dob,
      email: doctorData.email,
      homePhone: doctorData.homePhone,
      salutation: state.salutation,
      referenceId: doctorData.referenceId,
      primaryLang: state.primaryLanguage,
      secondaryLang: state.secondaryLanguage,
      providerType: doctorData.providerType,
      providerSpecialtyIds: doctorData.providerSpecialtyIds,
      spServiceIds: doctorData.spServiceIds,
      spOfficeIds: doctorData.spOfficeIds,
      spAdditionalLangIds: doctorData.spAdditionalLangIds,
      addressLine1: addressField,
      addressLine2: state.address2,
      addressLine3: null,
      postalZipCode: postalCodeField,
      countryCode: ISO_countryCode ? ISO_countryCode : state.CountryCode,
      spRegProvince: provinceField,
      sysUserId: null,
      city: cityField,
    };
    body = JSON.stringify(body);
    let response = await updateRequest(URL, body, true);
    setUpdating(false);
    if (response.ok) {
      const data = await response.text();
      getProfile();
      console.log("RESPONSE FROM SERVER => " + JSON.stringify(data));
      setSuccessMessage("Your data is updated");
      setSuccessAlertBar(true);
    }
  };

  const updateAdminProfile = async () => {
    setUpdating(true);
    const URL = `user/${sysUserId}?tenant=${TENANT_ID}`;
    let body = adminProfile;
    body.salutation = state.salutation;
    body.firstName = state.firstName;
    body.middleName = state.middleName;
    body.lastName = state.lastName;
    body.phoneNumber = state.phoneNumber;
    body.dob = state.dob;
    body = JSON.stringify(body);
    let response = await updateRequest(URL, body, true);
    setUpdating(false);
    if (response.ok) {
      const data = await response.text();
      getAdminProfile();
      console.log("RESPONSE FROM SERVER => " + JSON.stringify(data));
      setSuccessMessage("Your data is updated");
      setSuccessAlertBar(true);
    }
  };

  const getForm = () => {
    if (menu.length !== 0 && selectedMenu !== null && userType !== "") {
      let form = null;
      if (userType === "SERVICE_PROVIDER") {
        if (selectedMenu === "Account Info") {
          form = (
            <SP_AccountInfoForm
              page="profile"
              salutation={state.salutation}
              firstName={state.firstName}
              lastName={state.lastName}
              middleName={state.middleName}
              dob={state.dob}
              city={state.city}
              phoneNumber={state.phoneNumber}
              email={state.email}
              address={state.address}
              postalCode={state.postalCode}
              province={state.province}
              CountryCode={state.CountryCode}
              primaryLanguage={state.primaryLanguage}
              secondaryLanguage={state.secondaryLanguage}
              updateForm={(field, value) => updateState(field, value)}
              disabled={disabled}
            />
          );
        } else if (selectedMenu === "Schedule") {
          form = (
            <SP_ScheduleForm
              propsUpdateState={updateScheduleState}
              updateDays={updateScheduleDays}
              scheduleState={scheduleState}
              availabilities={scheduleAvailability}
              disabled={disabled}
              onDeleteAvailability={getScheduleData}
              onAddSchedule={updateSchedule}
              clearForm={clearScheduleForm}
              updating={updating}
              formError={addAvailabilityFormError}
            />
          );
        } else if (selectedMenu === "Services") {
          form = <SP_ServicesForm />;
        }
      } else if (userType === "PATIENT") {
        if (selectedMenu === "Login") {
          form = (
            <RegisterForm
              page="profile"
              salutation={state.salutation}
              firstName={state.firstName}
              lastName={state.lastName}
              middleName={state.middleName}
              dob={state.dob}
              phoneNumber={state.phoneNumber}
              email={state.email}
              updateForm={(field, value) => updateState(field, value)}
              disabled={disabled}
            />
          );
        } else if (selectedMenu === "Account Info") {
          form = (
            <PT_AccountInfoForm
              page="profile"
              salutation={state.salutation}
              firstName={state.firstName}
              lastName={state.lastName}
              middleName={state.middleName}
              dob={state.dob}
              phoneNumber={state.phoneNumber}
              email={state.email}
              address={state.address}
              postalCode={state.postalCode}
              province={state.province}
              city={state.city}
              CountryCode={state.CountryCode}
              updateForm={(field, value) => updateState(field, value)}
              disabled={disabled}
              emergencyContactName={state.emergencyContactName}
              emergencyContactNumber={state.emergencyContactNumber}
              emergencyContactRelation={state.emergencyContactRelation}
            />
          );
        } else if (selectedMenu === "Medical Info") {
          form = <PT_MedicalInfoForm disabled={disabled} />;
        } else if (selectedMenu === "Dependants") {
          form = <PT_DependantForm />;
        } else if (selectedMenu === "Payment") {
          form = <PT_PaymentForm />;
        }
      } else if (userType === "ADMIN") {
        form = (
          <AdminProfileForm
            salutation={state.salutation}
            firstName={state.firstName}
            lastName={state.lastName}
            middleName={state.middleName}
            dob={state.dob}
            phoneNumber={state.phoneNumber}
            updateForm={(field, value) => updateState(field, value)}
            disabled={disabled}
          />
        );
      }
      return form;
    } else {
      return null;
    }
  };

  const onSelectMenu = (item) => {
    if (
      item === "Services" ||
      item === "Medical Info" ||
      item === "Dependants" ||
      item === "Payment"
    ) {
      setIsComingSoon(true);
    } else {
      setIsComingSoon(false);
    }
    setSelectedMenu(item);
    setdisabled(true);
    if (item === "Schedule") {
      getScheduleData();
    }
  };

  const getScheduleData = async () => {
    setLoading(true);
    var a = new Date().getTimezoneOffset();
    let currentYear = new Date().getFullYear();
    let fromDate = `${currentYear}-01-01`;
    let toDate = `${currentYear}-12-31`;
    var timrZoneOffset = -Math.round(a / 60) + ":" + -(a % 60);
    let URL = `serviceProvider/${userId}/schedule?tenant=${TENANT_ID}&timeZoneId=GMT%2B${timrZoneOffset}&fromDateStr=${fromDate}&toDateStr=${toDate}`;
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
          obj.title = `Available ${availabilityType} ${obj.days !== null ? "on " + obj.days : ""}`;
          obj.advancedTitle = "&#10004;";
          obj.color = Colors.PRIMARY;
          obj.extendedProps = data[i];
          availabilities.push(obj);
        }
      }
      setScheduleAvailability(availabilities);
      console.log("availabilities grouped: " + JSON.stringify(availabilities));
    }
  };

  const onLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_Id");
    localStorage.removeItem("token");
    history.push({ pathname: "/signIn", search: `?tenant=${TENANT_ID}` });
  };

  const alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlertBar(false);
  };

  return (
    <div>
      <Header />
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12} className={classes.menuSide}>
          <div className={classes.title}>{t("Profile")}</div>
          <Box className={classes.shortDetails}>
            <Box className={classes.thumbnail}>
              <Box className={classes.thumbnailText}>
                {state.firstName.substring(0, 1).toUpperCase()}{" "}
                {state.lastName.substring(0, 1).toUpperCase()}
              </Box>
            </Box>
            <div className={classes.doctorName}>
              {state.salutation} {state.firstName} {state.lastName}
            </div>
            <div className={classes.subTitle}>{userType}</div>
          </Box>
          <Box>
            {menu.length !== 0 &&
              menu.map((item, index) => {
                return (
                  <Box
                    className={
                      item === selectedMenu
                        ? classes.activeMenuItem
                        : classes.menuItem
                    }
                    onClick={() => onSelectMenu(item)}
                  >
                    <div className={classes.menuText}>{item}</div>
                  </Box>
                );
              })}
          </Box>
          <div style={{ textAlign: "left" }}>
            <FormButton
              title={t("Logout")}
              onClick={onLogout}
              buttonStyle={{ marginTop: 12, width: "100%" }}
            />
          </div>
        </Grid>
        <Grid item sm={9} xs={12} className={classes.form}>
          <Box className={classes.formFixedWidthView}>
            {menu.length !== 0 && (
              <>
                <div className={classes.editButton}>
                  {selectedMenu !== "Schedule" && (
                    <div className={classes.formTitle}>
                      {selectedMenu} {isComingSoon ? "- (Coming Soon!)" : ""}
                    </div>
                  )}
                  {!isComingSoon && selectedMenu !== "Schedule" && (
                    <FormButton
                      buttonStyle={{ padding: 2 }}
                      disabled={loading}
                      loading={updating}
                      title={disabled ? t("editCapital") : t("saveCapital")}
                      onClick={toggleEditSave}
                    />
                  )}
                </div>
                <Grid
                  container
                  spacing={
                    selectedMenu === "Schedule" ||
                      selectedMenu === "Medical Info"
                      ? 0
                      : 2
                  }
                  className={isComingSoon ? classes.comingSoon : null}
                // style={{ paddingLeft: 12, paddingRight: 12 }}
                >
                  {getForm()}
                </Grid>
              </>
            )}
          </Box>
          <Snackbar
            open={successAlertBarError}
            autoHideDuration={3000}
            onClose={alertClose}
          >
            <Alert severity="success">{successMessage}</Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
