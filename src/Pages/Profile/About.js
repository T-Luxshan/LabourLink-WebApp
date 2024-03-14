import React from "react";
import { Typography } from "@mui/material";

function AboutLabourLink() {
  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
      >
        About Labour Link
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: "Montserrat" }}>
        Welcome to Labour Link, a comprehensive platform designed to streamline
        the process of finding, hiring, and managing laborers for various tasks
        and projects. Whether you're a customer in need of skilled workers or a
        worker looking for job opportunities, Labour Link provides a seamless
        and efficient solution to connect users with the right resources.
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: "Montserrat" }}>
        Our mission at Labour Link is to revolutionize the way people find and
        hire laborers for their tasks and projects. We aim to empower both
        customers and workers by providing them with a user-friendly platform
        that offers a wide range of features and functionalities to meet their
        needs.
      </Typography>

      {/* Features Overview Section */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: "Montserrat", fontWeight: "bold", marginTop: "20px" }}
      >
        Features Overview
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: "Montserrat" }}>
        <strong>User Registration and Authentication</strong>
        <br />
        - User Registration: Customers and workers can easily sign up for an
        account by providing necessary details such as name, email, mobile
        number, NIC number, and password.
        <br />
        - Input Validation: Our platform ensures data accuracy and security
        through input validation checks for fields such as name, email, NIC
        format, password format, and more.
        <br />
        - Terms of Service and Privacy Policy: Users agree to our terms of
        service and privacy policy during registration, ensuring transparency
        and legal compliance.
        <br />- Redundancy Check: To prevent duplicate accounts, we perform a
        redundancy check in the database to verify if an account with the
        provided details already exists.
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: "Montserrat" }}>
        <strong>User Dashboard</strong>
        <br />
        <strong>For Customers</strong>
        <br />
        - Profile Management: Customers can update their profile information,
        manage passwords, and delete their accounts as needed.
        <br />
        - Job Selection Category: Choose from a variety of job categories to
        find the right laborers for their tasks.
        <br />
        - Map View: Customers can view nearby workers on a map using Google API,
        facilitating easier selection and hiring.
        <br />
        - Communication Tools: In-app messaging and calling features allow
        seamless communication between customers and workers.
        <br />
        - Feedback and Reviews: Leave feedback and ratings for hired workers,
        enhancing transparency and accountability.
        <br />
        <strong>For Workers</strong>
        <br />
        - Profile Management: Workers can update their profiles, manage
        passwords, and delete accounts.
        <br />
        - Map View: View customer locations on a map to better understand job
        requirements and locations.
        <br />
        - Hiring Requests: Access a list of hiring requests received, including
        details such as customer name, job title, and location.
        <br />
        - Communication: Receive email notifications for work requests and
        communicate with customers via in-app calling.
        <br />
        <strong>For Admins</strong>
        <br />
        - User Profiles Management: Admins can manage user accounts, including
        blocking, suspending, or deleting accounts if necessary.
        <br />
        - Review Management: Review and manage feedback and ratings to ensure
        compliance with platform policies.
        <br />
        - Notification Alerts: Receive notifications for new user registrations
        and other important system events.
        <br />
        - Help and Support: Access resources and documentation, and contact
        support for assistance with technical or operational issues.
        <br />- Access Control: Admins have control over various aspects of the
        system to maintain security and integrity.
      </Typography>
      {/* Include more sections as needed */}

      {/* Our Commitment Section */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: "Montserrat", fontWeight: "bold", marginTop: "20px" }}
      >
        Our Commitment
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: "Montserrat" }}>
        At Labour Link, we are committed to providing a reliable, secure, and
        user-friendly platform for both customers and workers. With our
        extensive features and dedicated support, we strive to make the process
        of finding, hiring, and managing laborers as seamless and efficient as
        possible.
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontFamily: "Montserrat" }}>
        Thank you for choosing Labour Link. Let's build a better future
        together!
      </Typography>
    </div>
  );
}

export default AboutLabourLink;
