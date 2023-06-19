import classes from './DeleteNotifier.module.css';
import Button from '../button/Button';
import  ReactDOM  from 'react-dom';

const DeleteNotifier = (props) => {
    return  ReactDOM.createPortal( 
    <div className={classes.backdrop}>
      <div className={classes.modal}>
        <div>
          <header>{props.title}</header>
        </div>
        <p>{props.message}</p>
        <div className={classes.footer}>
            <Button onClick={props.onConfirm}>Delete</Button>
            <Button onClick={props.onCancel}>Cancel</Button>
        </div>
      </div>
    </div>,document.getElementById('DeleteModal')
     );
}

export default DeleteNotifier;

