import React, { useState } from "react";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";
import logo from '../Images/app-logo3.png' 

function Notification() {
    // const [name, setName] = useState("");
 
    // function warningNotification() {
    //     addNotification({
    //         title: "Warning",
    //         subtitle: "Please fill it",
    //         message: "You have to enter name",
    //         theme: "red",
    //         closeButton: "X",
    //     });
    // }
 
    // function successNotification() {
    //     addNotification({
    //         title: "Success",
    //         subtitle: "You have successfully submitted",
    //         message: "Welcome to GeeksforGeeks",
    //         theme: "light",
    //         closeButton: "X",
    //         backgroundTop: "green",
    //         backgroundBottom: "yellowgreen",
    //     });
    // }
 
    // function handleSubmit(e) {
    //     e.preventDefault();
    //     if (name === "") warningNotification();
    //     else successNotification();
    // }
 
    // return (
    //     <div className="App">
    //         <Notifications />
    //         <h1>Hey Geek!</h1>
    //         <form>
    //             <label>Name:</label>
    //             <input
    //                 name="name"
    //                 value={name}
    //                 onChange={(e) => setName(e.target.value)}
    //             />
    //             <button onClick={handleSubmit} type="submit">
    //                 Submit
    //             </button>
    //         </form>
    //     </div>
    // );

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