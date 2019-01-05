import React from 'react';
import SideNav from './../../HOC/sideNav';
import MyButton from './../utils/button';
import UserHistoryBlock from '../utils/history_block';

const UserDashboard = ({user}) => {
    return (
        <SideNav>
            <div>
                <div className="user_nfo_panel">
                    <h1>User Information</h1>
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastname}</span>
                        <span>{user.userData.email}</span>
                    </div>
                    <MyButton 
                        type="default"
                        title="Edit account info"
                        linkTo="/user/user_profile"
                    />
                </div>
                {
                    user.userData.history ? 
                        <div className="user_nfo_panel">
                            <h1>History purchases</h1>
                            <div className="user_product_block_wrapper">
                                <UserHistoryBlock 
                                    products={user.userData.history}
                                />
                            </div>
                        </div>
                    :null
                }
            </div>
        </SideNav>
    )
}

export default UserDashboard;
