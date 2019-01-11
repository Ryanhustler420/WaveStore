import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import SideNav from './../../../HOC/sideNav';

import Dropzone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/fontawesome-free-solid';
import {CircularProgress} from '@material-ui/core';

class AddFileLocalComponent extends Component {
  constructor () {
    super ();
    this.state = {
      formSuccess: false,
      formError: false,
      uploading: false,
      files: [],
    };
  }

  onDrop (files) {
    this.setState ({uploading: true});

    let formData = new FormData ();
    const config = {
      header: {'content-type': 'multipart/form-data'},
    };

    formData.append ('file', files[0]);

    axios
      .post ('/api/users/uploadfile_local', formData, config)
      .then (response => {
        if (response.data.success) {
          this.setState (
            {
              formSuccess: true,
              uploading: false,
              formError: false,
            },
            () => {
              setTimeout (() => {
                this.setState ({formSuccess: false});
              }, 2000);
            }
          );
        }
      });
  }

  componentDidMount () {
    axios.get ('/api/users/admin_files').then (response => {
      this.setState ({files: response.data});
    });
  }

  showFileList = () => (
      this.state.files ? 
        this.state.files.map((item, i) => (
            <li key={i}>
                <Link to={`/api/users/download/${item}`} target="_blank">
                    {item}
                </Link>
            </li>
        ))
      :null
  )

  render () {
    return (
      <SideNav>
        <h1>Upload File</h1>
        <div>
          <Dropzone
            onDrop={e => this.onDrop (e)}
            multiple={false}
            className="dropzone_box"
          >
            <div className="wrap">
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
          </Dropzone>
          {this.state.uploading
            ? <div
                className="dropzone_box"
                style={{
                  textAlign: 'center',
                  paddingTop: '60px',
                }}
              >
                <CircularProgress style={{color: `#00bcd4`}} thickness={7} />
              </div>
            : null}
          <div style={{clear: 'both'}}>
            {this.state.formSuccess
              ? <div className="form_success">Success</div>
              : null}
            {this.state.formError
              ? <div className="error_label">Please check your data</div>
              : null}
          </div>
          <hr />
          <div>
            <ul>
              {this.showFileList ()}
            </ul>
          </div>
        </div>
      </SideNav>
    );
  }
}

export default AddFileLocalComponent;
