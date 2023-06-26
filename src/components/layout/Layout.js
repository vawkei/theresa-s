import MainFooter from "./MainFooter";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <div>
      <MainNavigation />
      <main style={{ width: "100%", maxWidth: "60rem", margin: "10rem auto" }}>
      {/* <main style={{ width: "100%", maxWidth: "72rem", margin: "1rem auto" }}> */}
        {props.children}
        <MainFooter />
      </main>
    </div>
  );
};

export default Layout;
