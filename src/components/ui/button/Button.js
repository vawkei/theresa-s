import classes from './Button.module.css';
const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      // className={` ${classes.button} `}>
       className={` ${props.className}  ${classes.button} `}> 
      {props.children}
    </button>
  );
};

export default Button;
