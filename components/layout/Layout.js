import { Fragment } from "react";
import ScrollToTopButton from "../ScrollToTop/ScrollToTop";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
      <ScrollToTopButton />
      <Footer />
    </Fragment>
  );
};

export default Layout;
