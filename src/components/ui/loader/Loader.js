import  ReactDOM  from 'react-dom';
import classes from './Loader.module.css';
import loadingImage from "../../../assets/veeshoploading.gif";


const Loader = () => {
    
    return ReactDOM.createPortal( 
        <div className={classes.background}>
            <div className={classes.image}>
                <img src={loadingImage} alt='Loading...'/>
            </div>
        </div>,document.getElementById('Loader')
     );
}
 
export default Loader;