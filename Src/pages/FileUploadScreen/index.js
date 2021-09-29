import { Component } from 'react';
import React, { useEffect, useState } from 'react';
import { TENANT_ID } from '../../config/TenantConfig';
import Header from '../../components/Header';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import FormButton from '../../components/FormButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
  Typography,
  Grid,
  TextField,
  Container,
  Box,
  IconButton
} from '@material-ui/core';
import { useStyles } from './styles';
import { postRequest } from '../../common/fetchRequest';

const FileUploadScreen = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [infoMessage, setInfoMessage] = useState(false);
  const [state, setState] = useState({
    infoMessage: ''
  });
  const classes = useStyles();

  const changeHandler = event => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const updateState = (field, value) => {
    setState(previous => ({ ...previous, [field]: value }));
  };

  const alertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // setalertBarError(false);
    setInfoMessage(false);
  };

  const uploadBatchFileViaREST = async () => {
    var formData = new FormData();
    formData.append('batchFile', selectedFile);
    let URL = `billing/billingCode?tenant=${TENANT_ID}`;
    let response = await postRequest(URL, formData, true);
    if (response.ok) {
      let result = await response.text();
      setInfoMessage(true);
      updateState('infoMessage', JSON.stringify(result));
    }
  };

  return (
    <div>
      <Header />
      <Typography className={classes.titleText}>Upload Batch File</Typography>
      <input type="file" name="file" onChange={changeHandler} />
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{' '}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select file</p>
      )}
      <div>
        <FormButton
          title="UPLOAD"
          onClick={uploadBatchFileViaREST}
          endIcon={<CloudUploadIcon style={{ fontSize: 35 }} />}
        />
        <Snackbar
          open={infoMessage}
          onClose={alertClose}
          autoHideDuration={3000}>
          <Alert severity="info">{state.infoMessage}</Alert>
        </Snackbar>
      </div>
    </div>
  );
};
export default FileUploadScreen;
