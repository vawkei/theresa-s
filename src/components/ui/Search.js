import classes from './Search.module.css'

const Search = (props) => {
    return ( 
        <div className={classes.search}>
            <input type="text" value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>
        </div>
     );
}
 
export default Search;