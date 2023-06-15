import classes from './DrawerToggleButton.module.css';

const DrawerToggleButton = (props) => {
    return ( 
        <button className={classes.button} onClick={props.toggleHandler}>
            <div className={classes.toggleLine} />
            <div className={classes.toggleLine} />
            <div className={classes.toggleLine} />
        </button>
     );
}
 
export default DrawerToggleButton;