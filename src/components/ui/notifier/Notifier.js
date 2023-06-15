import classes from './Notifier.module.css';

const Notifier = (props) => {
    return ( 
        <div className={classes.modal}>
            <header>{props.title}</header>
            <p>{props.message}</p>
        </div>
     );
}
 
export default Notifier;