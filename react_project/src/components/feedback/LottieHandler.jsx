import Lottie from "lottie-react";
import notFound from "@assets/lottieFiles/notFound.json";
import empty from "@assets/lottieFiles/empty.json";
import loading from "@assets/lottieFiles/loading.json";
import error from "@assets/lottieFiles/error.json";
import PropTypes from "prop-types";

const lottieFilesMap = {
  notFound,
  empty,
  loading,
  error,
};

const LottieHandler = ({ type, message, containerClassName }) => {
  const lottie = lottieFilesMap[type];
  const messageStyle =
    type === "error"
      ? { fontSize: "19px", color: "red" }
      : { fontSize: "19px", marginTop: "30px" };

  return (
    <div className={`d-flex flex-column align-items-center ${containerClassName}`}>
      <Lottie animationData={lottie} style={{ width: "400px" }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};

LottieHandler.propTypes = {
  type: PropTypes.oneOf(['notFound', 'empty', 'loading', 'error']).isRequired,
  message: PropTypes.string,
  containerClassName: PropTypes.string,
};

LottieHandler.defaultProps = {
  message: "",
  containerClassName: "",
};

export default LottieHandler;
