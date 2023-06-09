import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <div>
      <MainNavigation />
      <main style={{ width: "100%", maxWidth: "42rem", margin: "3rem auto" }}>
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
