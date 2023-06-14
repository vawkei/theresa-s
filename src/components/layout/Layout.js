import MainFooter from "./MainFooter";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <div>
      <MainNavigation />
      <main style={{ width: "100%", maxWidth: "42rem", margin: "1rem auto" }}>
        {props.children}
        <MainFooter />
      </main>
    </div>
  );
};

export default Layout;
