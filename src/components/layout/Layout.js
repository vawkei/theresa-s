import MainFooter from "./MainFooter";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <div>
      <MainNavigation />
      <main style={{width: "100%", maxWidth: "60rem", margin: "10rem auto"}}> 
        {props.children}     
      </main>
      <MainFooter />  
    </div>
  );
};

export default Layout;
