import styles from "./Loading.module.scss";

import LoadingIcon from "../../assets/loading.svg";

const Loading = () => {
  return (
    <div className={styles.Loading}>
      <img src={LoadingIcon} alt="" />
    </div>
  );
};

export default Loading;
