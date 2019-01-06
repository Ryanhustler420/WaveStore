import React from 'react';
import SideNav from './../../HOC/sideNav';
import UpdatePersonalInfo from './update_personal_info';

const UpdateProfile = () => {
  return (
    <SideNav>
        <h1>Profile</h1>
        <UpdatePersonalInfo />
    </SideNav>
  )
}

export default UpdateProfile;
