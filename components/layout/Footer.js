import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className="bg-gray-100 container mx-auto px-6 pt-10 pb-6">
        © Huy Bui. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
