import classes from "./ContactForm.module.css";
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";
import { BsEnvelope } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { BsTelephoneInbound } from "react-icons/bs";
import { useState, useRef, Fragment, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Notifier from "../../ui/notifier/Notifier";

const ContactForm = () => {
  const [formValidity, setFormValidity] = useState({
    firstName: true,
    subject: true,
    email: true,
    message: true,
  });

  const [notifier, setNotifier] = useState("");


  let timeDuration=5000;
  let notifierClearer;

  useEffect(()=>{
    if(notifier){
      notifierClearer = setTimeout(function(){
        setNotifier("");
      },timeDuration)
      return()=>{
        clearTimeout(notifierClearer)
      }
    }
  },[notifier])

  



  const firstNameInputRef = useRef();
  const subjectInputRef = useRef();
  const emailInputRef = useRef();
  const messageInputRef = useRef();

  const form = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredSubject = subjectInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredMessage = messageInputRef.current.value;

    setFormValidity({
      firstName: enteredFirstName,
      subject: enteredSubject,
      email: enteredEmail,
      message: enteredMessage,
    });

    const enteredFirstNameIsValid = enteredFirstName.trim() !== "";
    const enteredSubjectIsValid = enteredSubject.trim() !== "";
    const enteredEmailIsValid = enteredEmail.trim() !== "";
    const enteredMessageIsValid = enteredMessage.trim() !== "";

    const formIsValid =
      enteredFirstNameIsValid &&
      enteredSubjectIsValid &&
      enteredEmailIsValid &&
      enteredMessageIsValid;

    if (!formIsValid) {
      return;
    }
    // console.log({
    //   name:formValidity.firstName,
    //   lastName:formValidity.lastName,
    //   email:formValidity.email,
    //   message:formValidity.message
    // });

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_YOUR_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_YOUR_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_YOUR_PUBLIC_KEY
      )
      .then(
        () => {
          console.log("Email sent");
          setNotifier({
            title: "Success",
            message: "Email sent to sales@theresas.com",
          });
        },
        (error) => {
          console.log(error.text);
          setNotifier({
            title: "Failed",
            message: "Email not sent.",
          });
        }
      );

    firstNameInputRef.current.value = "";
    subjectInputRef.current.value = "";
    emailInputRef.current.value = "";
    messageInputRef.current.value = "";


  };

  return (
    <Fragment>
      {notifier && <Notifier title={notifier.title} message={notifier.message} />}
      <form className={classes.contact} onSubmit={submitHandler} ref={form}>
        <Card className={classes.cardClass1}>
          <div
            className={`${classes.control} ${
              formValidity.firstName ? "" : classes.invalid
            }`}>
            <label>Name</label>
            <input
              placeholder="Enter your full name here"
              type={"text"}
              ref={firstNameInputRef}
              name="user_name"
            />
            {!formValidity.firstName && (
              <p>Please fill out the first name input</p>
            )}
          </div>
          <div
            className={`${classes.control} ${
              formValidity.subject ? "" : classes.invalid
            }`}>
            <label>Subject</label>
            <input
              placeholder="Enter subject  of your email here"
              type="text"
              name="subject"
              ref={subjectInputRef}
            />
            {!formValidity.subject && (
              <p>Please fill out the last name input</p>
            )}
          </div>
          <div
            className={`${classes.control} ${
              formValidity.email ? "" : classes.invalid
            }`}>
            <label>Email Address</label>
            <input
              placeholder="Enter your email address here"
              type="email"
              ref={emailInputRef}
              name="user_email"
            />
            {!formValidity.email && <p>Please fill in your email address</p>}
          </div>
          <div
            className={`${classes.control} ${
              formValidity.message ? "" : classes.invalid
            }`}>
            <label>Message</label>
            <textarea
              cols={"5"}
              rows={"5"}
              type={"text"}
              ref={messageInputRef}
              name="user_message"></textarea>
            {!formValidity.message && <p>Please drop a message</p>}
          </div>
          <div className={classes.action}>
            <Button className={classes.btn}>Send message</Button>
          </div>
          {/* {!formValidity && <p>What is wrong with you</p>} */}
        </Card>

        <Card className={classes.cardClass2}>
          <div>
            <Card>
              <div>
                <BsEnvelope
                  size={50}
                  style={{
                    backgroundColor: "purple",
                    borderRadius: "8px",
                    padding: "1rem",
                    color: "white",
                  }}
                />
              </div>
              <h4>
                <b>Chat to Sales</b>
              </h4>
              <p>Speak to our friendly team</p>
              <br />
              <p>
                <b>sales@theresas.com</b>
              </p>
            </Card>
          </div>
          <br />
          <div>
            <br />
            <Card>
              <div>
                <GoLocation
                  size={50}
                  style={{
                    backgroundColor: "purple",
                    borderRadius: "8px",
                    padding: "1rem",
                    color: "white",
                  }}
                />
              </div>
              <h4>
                <b>Visit us</b>
              </h4>
              <p>Visit our office HQ</p>
              <br />
              <p>
                <b>100 Smiths Way, Lakewood O-Town,Delta.</b>
              </p>
            </Card>
          </div>
          <br />
          <div>
            <Card>
              <div>
                <BsTelephoneInbound
                  size={50}
                  style={{
                    backgroundColor: "purple",
                    borderRadius: "8px",
                    padding: "1rem",
                    color: "white",
                  }}
                />
              </div>
              <h4>
                <b>Call us</b>
              </h4>
              <p>Mon-Fri from 8am to 5pm</p>
              <br />
              <p>
                <b>04024024401k</b>
              </p>
            </Card>
          </div>
        </Card>
      </form>
    </Fragment>
  );
};

export default ContactForm;











