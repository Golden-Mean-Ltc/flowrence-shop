const SpinnerSuccessFail = ({ status }) => {
  if (status === "loading") {
    return (
      <div
        className="spinner-border spinner-border-sm text-light "
        role="status"
      ></div>
    );
  }
  if (status === "success") {
    return <span>&#9989;</span>;
  }
  return <span></span>
};

export default SpinnerSuccessFail;
