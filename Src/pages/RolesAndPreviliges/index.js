import React, { useEffect, useState } from "react";
import FormButton from "../../components/FormButton";
import { useStyles } from "./styles";
import Header from "../../components/Header";
import RolesTable from "../../components/RolesAndPreviliges/RolesTable";
import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  Container,
  Box,
} from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { useTranslation } from "react-i18next";
import { Theme, withStyles } from "@material-ui/core/styles";
import { TENANT_ID } from "../../config/TenantConfig";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { Colors } from "../../styles";
import {
  getRequest,
  postRequest,
  updateRequest,
} from "../../common/fetchRequest";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const RolesAndPreviliges = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [gettingRoles, setGettingRoles] = useState(true);
  const [gettingPermissions, setGettingPermissions] = useState(true);
  const [allRoles, setAllRoles] = useState([]);
  const [allRolesPer, setAllRolesPer] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);

  const [addNewRoleVisible, setaddNewRoleVisible] = useState(false);
  const [roleDescription, setRoleDescription] = useState("");
  const [roleDescriptionError, setRoleDescriptionError] = useState("");
  const [creatingRole, setCreatingRole] = useState(false);

  const [addNewPermissionVisible, setaddNewPermissionVisible] = useState(false);
  const [permission, setPermission] = useState("");
  const [PermissionDescription, setPermissionDescription] = useState("");
  const [PermissionError, setPermissionError] = useState("");
  const [permissionDescriptionError, setPermissionDescriptionError] =
    useState("");

  const [alertBarError, setalertBarError] = React.useState(false);
  const [successAlertBarError, setsuccessAlertBarError] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPermission, setSelectedPermission] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setRoleDescription("");
    setRoleDescriptionError("");
    setCreatingRole(false);
    setOpen(false);
  };

  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const handleClosePermissionModal = () => {
    setPermission("");
    setPermissionDescription("");
    setPermissionDescriptionError("");
    setCreatingRole(false);
    setOpenPermissionModal(false);
  };

  const alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setalertBarError(false);
    setsuccessAlertBarError(false);
  };

  useEffect(() => {
    getAllRoles();
    getAllPermissions();
  }, []);

  const getAllRoles = async () => {
    setGettingRoles(true);
    let URL = `role/getAll?tenant=${TENANT_ID}`;
    let response = await getRequest(URL, true);
    setGettingRoles(false);
    if (response.ok) {
      const data = await response.json();
      console.log("data: " + JSON.stringify(data));
      var permissionArrays = [];
      var roleArrays = [];
      var Roldata = null;
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].rolePermissions.length; j++) {
          var permission = data[i].rolePermissions[j].permission;
          permissionArrays.push(permission);
        }
        Roldata = {
          description: data[i].description,
          roleId: data[i].roleId,
          rolePermissions: permissionArrays.join(',   '),
        };
        roleArrays.push(Roldata);
     
      }
        //console.log("Roldata ===> " + JSON.stringify(roleArrays));
        setAllRolesPer(roleArrays);
      setAllRoles(data);
    }
  };

  const createNewRole = async () => {
    if (roleDescription !== "") {
      setRoleDescriptionError("");
      setCreatingRole(true);
      let URL = `role?tenant=${TENANT_ID}`;
      const body = JSON.stringify({
        description: roleDescription,
      });
      let response = await postRequest(URL, body, true);
      setCreatingRole(false);
      if (response.ok) {
        setsuccessAlertBarError(true);
        setSuccessMsg("New role created successfully");
        setRoleDescription("");
        setaddNewRoleVisible(false);
        getAllRoles();
      }
    } else {
      setRoleDescriptionError("Please enter role description");
    }
  };

  const updateRole = async () => {
    if (roleDescription !== "") {
      setRoleDescriptionError("");
      setCreatingRole(true);
      let URL = `role/${selectedRole.roleId}?tenant=${TENANT_ID}`;
      const body = JSON.stringify({
        description: roleDescription,
      });
      let response = await updateRequest(URL, body, true);
      setCreatingRole(false);
      if (response.ok) {
        getAllRoles();
        setsuccessAlertBarError(true);
        setSuccessMsg("Role updated successfully");
        handleClose();
        setRoleDescription("");
        setaddNewRoleVisible(false);
      }
    } else {
      setRoleDescriptionError("Please enter role description");
    }
  };

  const toggleAddNew = () => {
    setaddNewRoleVisible(!addNewRoleVisible);
  };

  const onEditRoleClick = (item) => {
    setaddNewRoleVisible(false);
    setSelectedRole(item);
    setRoleDescription(item.description);
    setOpen(true);
  };

  // Permission related functions
  const getAllPermissions = async () => {
    setGettingPermissions(true);
    let URL = `permission/getAll?tenant=${TENANT_ID}`;
    let response = await getRequest(URL, true);
    setGettingPermissions(false);
    if (response.ok) {
      const data = await response.json();
      console.log("data: " + JSON.stringify(data));
      setAllPermissions(data);
    }
  };

  const createNewPermission = async () => {
    let hasError = false;
    if (permission === "") {
      setPermissionError("Please enter permission");
      hasError = true;
    } else {
      setPermissionError("");
    }
    if (PermissionDescription === "") {
      setPermissionDescriptionError("Please enter permission description");
      hasError = true;
    } else {
      setPermissionDescriptionError("");
    }
    if (!hasError) {
      setCreatingRole(true);
      let URL = `permission?tenant=${TENANT_ID}`;
      const body = JSON.stringify({
        permission: permission,
        permissionDescription: PermissionDescription,
      });
      let response = await postRequest(URL, body, true);
      setCreatingRole(false);
      if (response.ok) {
        setsuccessAlertBarError(true);
        setSuccessMsg("New permission created successfully");
        setPermission("");
        setPermissionDescription("");
        setPermissionDescriptionError("");
        setaddNewPermissionVisible(false);
        getAllPermissions();
      }
    }
  };

  const updatePermission = async () => {
    let hasError = false;
    if (permission === "") {
      setPermissionError("Please enter permission");
      hasError(true);
    } else {
      setPermissionError("");
    }
    if (PermissionDescription === "") {
      setPermissionDescriptionError("Please enter permission description");
      hasError(true);
    } else {
      setPermissionDescriptionError("");
    }
    if (!hasError) {
      setRoleDescriptionError("");
      setCreatingRole(true);
      let URL = `permission/${selectedPermission.permissionId}?tenant=${TENANT_ID}`;
      const body = JSON.stringify({
        permission: permission,
        permissionDescription: PermissionDescription,
      });
      let response = await updateRequest(URL, body, true);
      setCreatingRole(false);
      if (response.ok) {
        getAllPermissions();
        setsuccessAlertBarError(true);
        setSuccessMsg("Role updated successfully");
        handleClose();
        setPermission("");
        setPermissionDescription("");
        setPermissionDescriptionError("");
        setaddNewRoleVisible(false);
        setOpenPermissionModal(false);
      }
    }
  };

  const toggleAddNewPermission = () => {
    setaddNewPermissionVisible(!addNewPermissionVisible);
  };

  const onEditPermissionClick = (item) => {
    setaddNewPermissionVisible(false);
    setSelectedPermission(item);
    setPermission(item.permission);
    setPermissionDescription(item.permissionDescription);
    setOpenPermissionModal(true);
  };

  const [openAddPermissionModal, setOpenAddPermissionModal] = useState(false);
  const handleCloseAddPermissionModal = () => {
    setOpenAddPermissionModal(false);
    setSelectedPermissionForAttaching(null);
    setSelectedPermissionForAttachingError("");
    setSelectedRole(null);
  };

  const openAddClickPermission = (item) => {
    setOpenAddPermissionModal(true);
    setSelectedRole(item);
  };

  const [selectedPermissionForAttaching, setSelectedPermissionForAttaching] =
    useState(null);
  const [
    selectedPermissionForAttachingError,
    setSelectedPermissionForAttachingError,
  ] = useState("");
  const [attchingPermission, setAttchingPermission] = useState(false);

  const attachPermission = async () => {
    if (selectedPermissionForAttaching === null) {
      setSelectedPermissionForAttachingError(t("permissionSelectionError"));
    } else {
      setSelectedPermissionForAttachingError("");
      setAttchingPermission(true);
      const URL = `role/${selectedRole.roleId}/attachPermission/${selectedPermissionForAttaching}?tenant=${TENANT_ID}`;
      let response = await postRequest(URL, null, true);
      setAttchingPermission(false);
      if (response.ok) {
        handleCloseAddPermissionModal();
        setsuccessAlertBarError(true);
        setSuccessMsg("Permission attached successfully");
        setSelectedPermissionForAttaching(null);
        getAllRoles();
      }
    }
  };

  return (
    <div>
      <Header showProfileIcon={true} />
      <div className={classes.mainContainer}>
        {!gettingRoles && !gettingPermissions && (
          <>
            <Typography className={classes.titleText}>Roles</Typography>

            <RolesTable
              tableData={allRoles}
              allRolesPer={allRolesPer}
              onEditRoleClick={onEditRoleClick}
              openAddClickPermission={openAddClickPermission}
            />

            {/* <div className={classes.rolesTableHeader}>
                            <div className={classes.roleHeader}>
                                Role
                            </div>
                            <div className={classes.permissionHeader}>
                                Permissions
                            </div>
                            <div className={classes.addPermissionHeader}>
                                Add Permissions
                            </div>
                            <div className={classes.actionHeader}>
                                Edit
                            </div>
                        </div> */}
            {/* {
                            allRoles.map((item, index) => {
                                return (
                                    <div className={classes.rolesTableRow}>
                                        <div className={classes.roleRow}>
                                            {item.description}
                                        </div>
                                        <div className={classes.permissionRow}>
                                            <Grid container alignItems="center">
                                                {item.rolePermissions.length !== 0 ?
                                                    item.rolePermissions.map((rolePermissionItem, i) => {
                                                        return (

                                                            <div style={{ display: 'flex', alignItems: 'center', marginRight: 12, marginBottom: 12 }}>
                                                                {rolePermissionItem.permission}
                                                                <div>
                                                                    {(i !== item.rolePermissions.length - 1) ? ', ' : ''}
                                                                </div>
                                                            </div>

                                                        )
                                                    })
                                                    :
                                                    'No permissions attached yet'
                                                }
                                            </Grid>
                                        </div>
                                        <div className={classes.AddPermissionRow}>
                                            <Grid item xs={12} sm={6}>
                                                <FormButton
                                                    title="Add Permission"
                                                    variant="outlined"
                                                    buttonStyle={{ padding: 0, marginBottom: 12 }}
                                                    onClick={() => openAddClickPermission(item)}
                                                />
                                            </Grid>
                                        </div>
                                        <div className={classes.actionRow}>
                                            <IconButton aria-label="delete" onClick={() => onEditRoleClick(item)} style={{ padding: 3 }}>
                                                <EditIcon fontSize="small" style={{ color: Colors.PRIMARY }} />
                                            </IconButton>
                                        </div>
                                    </div>
                                )
                            })
                        } */}
            <div className={classes.addNewRoleButton}>
              {!addNewRoleVisible && (
                <FormButton
                  title="Add new role"
                  onClick={toggleAddNew}
                  buttonStyle={{ textAlign: "left" }}
                />
              )}
            </div>
            {addNewRoleVisible && (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <Typography className={classes.textFiledLabel}>
                    Roles
                  </Typography>
                  <TextField
                    variant="outlined"
                    onChange={(event) => setRoleDescription(event.target.value)}
                    error={roleDescriptionError !== ""}
                    helperText={roleDescriptionError}
                    fullWidth
                    value={roleDescription}
                    size={"small"}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.button}>
                  <FormButton
                    title="Cancel"
                    onClick={toggleAddNew}
                    variant="outlined"
                    noBorder={true}
                    buttonStyle={{
                      marginTop: roleDescriptionError !== "" ? 0 : 22,
                    }}
                  />
                  <FormButton
                    title="Create"
                    onClick={createNewRole}
                    loading={creatingRole}
                    buttonStyle={{
                      marginTop: roleDescriptionError !== "" ? 0 : 22,
                      marginLeft: 12,
                    }}
                  />
                </Grid>
              </Grid>
            )}
            <Snackbar
              open={alertBarError}
              autoHideDuration={3000}
              onClose={alertClose}
            >
              <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>
            <Snackbar
              open={successAlertBarError}
              onClose={alertClose}
              autoHideDuration={3000}
            >
              <Alert severity="success">{successMsg}</Alert>
            </Snackbar>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
            >
              <div className={`popupHeaderBg_${TENANT_ID}`} />
              <DialogContent>
                <Typography className={classes.editPopupTitle}>
                  Edit Role
                </Typography>
                <Grid alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography className={classes.textFiledLabel}>
                      Role Description
                    </Typography>
                    <TextField
                      variant="outlined"
                      onChange={(event) =>
                        setRoleDescription(event.target.value)
                      }
                      error={roleDescriptionError !== ""}
                      helperText={roleDescriptionError}
                      fullWidth
                      value={roleDescription}
                      size={"small"}
                    />
                  </Grid>
                </Grid>
                <Grid container style={{ textAlign: "right" }}>
                  <Grid item xs={12} sm={12}>
                    <FormButton
                      title="Cancel"
                      onClick={handleClose}
                      variant="outlined"
                      noBorder={true}
                      buttonStyle={{
                        marginTop: roleDescriptionError !== "" ? 0 : 22,
                      }}
                    />
                    <FormButton
                      title="Save"
                      onClick={updateRole}
                      loading={creatingRole}
                      buttonStyle={{
                        marginTop: roleDescriptionError !== "" ? 0 : 22,
                        marginLeft: 12,
                      }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>

            <Typography className={classes.titleText}>Privileges</Typography>
            <div className={classes.rolesTableHeader}>
              <div className={classes.previligesHeader1}>Permission</div>
              <div className={classes.previligesHeader2}>Description</div>
              <div className={classes.previligesHeader3}>Edit</div>
            </div>
            {allPermissions.map((item, index) => {
              return (
                <div className={classes.rolesTableRow}>
                  <div className={classes.previligesRow1}>
                    {item.permission}
                  </div>
                  <div className={classes.previligesRow2}>
                    {item.permissionDescription}
                  </div>
                  <div className={classes.previligesRow3}>
                    <IconButton
                      onClick={() => onEditPermissionClick(item)}
                      style={{ padding: 3 }}
                    >
                      <EditIcon
                        fontSize="small"
                        style={{ color: Colors.PRIMARY }}
                      />
                    </IconButton>
                  </div>
                </div>
              );
            })}
            <div className={classes.addNewRoleButton}>
              {!addNewPermissionVisible && (
                <FormButton
                  title="Add new permission"
                  onClick={toggleAddNewPermission}
                  buttonStyle={{ textAlign: "left" }}
                />
              )}
            </div>
            {addNewPermissionVisible && (
              <Grid container spacing={2} alignItems="center">
                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={{
                    marginBottom:
                      PermissionError === "" &&
                      permissionDescriptionError !== ""
                        ? 22
                        : 0,
                  }}
                >
                  <Typography className={classes.textFiledLabel}>
                    Permision
                  </Typography>
                  <TextField
                    variant="outlined"
                    onChange={(event) => setPermission(event.target.value)}
                    error={PermissionError !== ""}
                    helperText={PermissionError}
                    fullWidth
                    value={permission}
                    size={"small"}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={{
                    marginBottom:
                      PermissionError !== "" &&
                      permissionDescriptionError === ""
                        ? 22
                        : 0,
                  }}
                >
                  <Typography className={classes.textFiledLabel}>
                    Permision Description
                  </Typography>
                  <TextField
                    variant="outlined"
                    onChange={(event) =>
                      setPermissionDescription(event.target.value)
                    }
                    error={permissionDescriptionError !== ""}
                    helperText={permissionDescriptionError}
                    fullWidth
                    value={PermissionDescription}
                    size={"small"}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.button}>
                  <FormButton
                    title="Cancel"
                    onClick={toggleAddNewPermission}
                    variant="outlined"
                    noBorder={true}
                  />
                  <FormButton
                    title="Create"
                    onClick={createNewPermission}
                    loading={creatingRole}
                    buttonStyle={{ marginLeft: 12 }}
                  />
                </Grid>
              </Grid>
            )}
            <Snackbar
              open={alertBarError}
              autoHideDuration={3000}
              onClose={alertClose}
            >
              <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>
            <Snackbar
              open={successAlertBarError}
              onClose={alertClose}
              autoHideDuration={3000}
            >
              <Alert severity="success">{successMsg}</Alert>
            </Snackbar>

            <Dialog
              open={openPermissionModal}
              onClose={handleClosePermissionModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
            >
              <div className={`popupHeaderBg_${TENANT_ID}`} />
              <DialogContent>
                <Typography className={classes.editPopupTitle}>
                  Edit Permission
                </Typography>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{
                      marginBottom:
                        PermissionError === "" &&
                        permissionDescriptionError !== ""
                          ? 22
                          : 0,
                    }}
                  >
                    <Typography className={classes.textFiledLabel}>
                      Permision
                    </Typography>
                    <TextField
                      variant="outlined"
                      onChange={(event) => setPermission(event.target.value)}
                      error={PermissionError !== ""}
                      helperText={PermissionError}
                      fullWidth
                      value={permission}
                      size={"small"}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{
                      marginBottom:
                        PermissionError !== "" &&
                        permissionDescriptionError === ""
                          ? 22
                          : 0,
                    }}
                  >
                    <Typography className={classes.textFiledLabel}>
                      Permision Description
                    </Typography>
                    <TextField
                      variant="outlined"
                      onChange={(event) =>
                        setPermissionDescription(event.target.value)
                      }
                      error={permissionDescriptionError !== ""}
                      helperText={permissionDescriptionError}
                      fullWidth
                      value={PermissionDescription}
                      size={"small"}
                    />
                  </Grid>
                </Grid>
                <Grid container style={{ textAlign: "right" }}>
                  <Grid item xs={12} sm={12}>
                    <FormButton
                      title="Cancel"
                      onClick={handleClosePermissionModal}
                      variant="outlined"
                      noBorder={true}
                      buttonStyle={{
                        marginTop: roleDescriptionError !== "" ? 0 : 22,
                      }}
                    />
                    <FormButton
                      title="Save"
                      onClick={updatePermission}
                      loading={creatingRole}
                      buttonStyle={{
                        marginTop: roleDescriptionError !== "" ? 0 : 22,
                        marginLeft: 12,
                      }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>

            <Dialog
              open={openAddPermissionModal}
              onClose={handleCloseAddPermissionModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
            >
              <div className={`popupHeaderBg_${TENANT_ID}`} />
              <DialogContent>
                <Typography className={classes.editPopupTitle}>
                  Attach Permission
                </Typography>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{
                      marginBottom:
                        PermissionError === "" &&
                        permissionDescriptionError !== ""
                          ? 22
                          : 0,
                    }}
                  >
                    <Typography className={classes.textFiledLabel}>
                      Select Permission
                    </Typography>
                    <TextField
                      variant="outlined"
                      onChange={(event) =>
                        setSelectedPermissionForAttaching(event.target.value)
                      }
                      error={selectedPermissionForAttachingError !== ""}
                      helperText={selectedPermissionForAttachingError}
                      fullWidth
                      value={selectedPermissionForAttaching}
                      select
                      size={"small"}
                    >
                      {allPermissions.map((option) => (
                        <MenuItem
                          key={option.permissionId}
                          value={option.permissionId}
                        >
                          {option.permission} - {option.permissionDescription}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container style={{ textAlign: "right" }}>
                  <Grid item xs={12} sm={12}>
                    <FormButton
                      title="Cancel"
                      onClick={handleCloseAddPermissionModal}
                      variant="outlined"
                      noBorder={true}
                      buttonStyle={{
                        marginTop: roleDescriptionError !== "" ? 0 : 22,
                      }}
                    />
                    <FormButton
                      title="Save"
                      onClick={attachPermission}
                      loading={attchingPermission}
                      buttonStyle={{
                        marginTop: roleDescriptionError !== "" ? 0 : 22,
                        marginLeft: 12,
                      }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default RolesAndPreviliges;
