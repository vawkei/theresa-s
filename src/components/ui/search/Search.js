import classes from "./Search.module.css";

const Search = (props) => {
  return (
    <div className={classes.search}>
      <input
        type="text"
        value={props.value}
        className={props.className}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Search;
