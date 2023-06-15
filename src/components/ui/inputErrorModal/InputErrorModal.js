import Button from "../button/Button";
import classes from "./InputErrorModal.module.css";

const InputErrorModal = (props) => {
  return (
    <div className={classes.backdrop}>
      <div className={classes.modal}>
        <div>
          <header>{props.title}</header>
        </div>
        <p>{props.message}</p>
        <div className={classes.footer}>
            <Button onClick={props.onConfirm}>Ok</Button>
        </div>
      </div>
    </div>
  );
};

export default InputErrorModal;
