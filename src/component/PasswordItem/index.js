import "./index.css";

const PasswordItem = (props) => {
  const { passwordDetails, isShow, deleteItem, id } = props;
  const { website, username, password } = passwordDetails;
  const websiteInitial = website ? website[0].toUpperCase() : "";

  const getPassword = () => {
    if (isShow) {
      return <p className="credentialDetailStyle">{password}</p>;
    } else {
      return (
        <img
          className="starsStyling"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          alt="stars"
        />
      );
    }
  }

  const handleDelete = () => {
    deleteItem(id)
  }

  return (
    <>
      <div className="credentialsBox">
        <div className="initialStyling">{websiteInitial}</div>
        <div className="credentialsStyle">
          <p className="credentialDetailStyle">{website}</p>
          <p className="credentialDetailStyle">{username}</p>
          {getPassword()}
        </div>
        <div>
          <button className="deleteButtonIcon" onClick={handleDelete}>
            <img
              className="deleteIcon"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordItem;
