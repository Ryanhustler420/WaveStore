import React from 'react';
import SideNav from './../../../HOC/sideNav';
import ManageBrands from './manage_brands';
import ManageWoods from './manage_woods';

const ManageCategories = () => {
    return (
        <SideNav>
            <ManageBrands />
            <ManageWoods />
        </SideNav>
    )
}

export default ManageCategories
