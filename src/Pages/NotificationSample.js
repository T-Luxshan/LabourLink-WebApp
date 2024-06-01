import React from "react";
import addNotification from "react-push-notification";
import logo from '../Images/app-logo3.png' 

function Notification() {

    const clickToNotify = () =>{
        addNotification({
            title:"First Notification",
            message:"This the first notification testing",
            duration: 4000,
            icon: logo,
            native: true,
            // onClick: ()=>window.location=""
        });
    }

    const labourHired = () =>{
        addNotification({
            title:"Hiring Successful",
            message:"You have successfully hired ",
            duration: 4000,
            icon: logo,
            native: true,
            // onClick: ()=>window.location=""
        });
    }

    return(
        <div>
            <button onClick={clickToNotify} style={{margin:'100px'}}> 
                Click to Notify
            </button>
        </div>
    )
}
 
export default Notification;