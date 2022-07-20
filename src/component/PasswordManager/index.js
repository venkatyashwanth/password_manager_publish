import "./index.css";
import React, { Component } from "react";
import { v4 } from "uuid";
import PasswordItem from "../PasswordItem";

class PasswordManager extends Component {
  state = {
    website: "",
    username: "",
    password: "",
    isShow: false,
    passwordInfo: [],
    searchInput: ''
  };

  handleWebsite = (event) => {
    this.setState({ website: event.target.value });
  };

  handleUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleFormData = (event) => {
    event.preventDefault();
    const { website, username, password, isShow, passwordInfo } = this.state;

    

    const newDetails = {
      id: v4(),
      website,
      username,
      password,
    };

    this.setState((prevState) => ({
      passwordInfo: [...prevState.passwordInfo, newDetails],
      website: "",
      username: "",
      password: "",
      
    }));
  };

  handleSearch = event => {
    this.setState({
      searchInput: event.target.value
    })
  }

  renderNoPassword = () => {
    return (
      <div className="no-passwords-container">
        <img
          className="no-password-image"
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
        />
        <p className="password-status-text">No Passwords</p>
      </div>
    );
  };

  deleteItem = id => {
    const {passwordInfo} = this.state;
    const filteredResults = passwordInfo.filter(eachItem => eachItem.id !== id)
    this.setState({passwordInfo: filteredResults})
  }

  renderPasswords = () => {
    const { passwordInfo,isShow, searchInput } = this.state;
    const searchResults = passwordInfo.filter(eachDetail =>
      eachDetail.website.toLowerCase().includes(searchInput.toLowerCase())
      )
    return (
      <ul className="listItemRenderStyle">
        {searchResults.map((eachItem) => (
          <li className="password-list-item" key={eachItem.id}>
            <PasswordItem passwordDetails={eachItem} isShow={isShow} deleteItem={this.deleteItem} id={eachItem.id}/>
          </li>
        ))}
      </ul>
    );
  };

  showHidePassword = () => {
    this.setState(prevState => ({isShow: !prevState.isShow}))
  }

  render() {
    const { website, username, password } = this.state;
    const { passwordInfo } = this.state;

    return (
      <div className="app-container">
        <div className="passwords-container">
          <img
            className="logo-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
          <div className="password-input-container">
            <div className="password-form">
              <form onSubmit={this.handleFormData}>
                <h1>Add New Password</h1>
                <div className="inputFieldContainer">
                  <div>
                    <img
                      className="inputFieldImage"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                    />
                  </div>
                  <input
                    className="inputField"
                    type="text"
                    placeholder="Enter Website"
                    onChange={this.handleWebsite}
                    value={website}
                  />
                </div>
                <div className="inputFieldContainer">
                  <div>
                    <img
                      className="inputFieldImage"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                    />
                  </div>
                  <input
                    className="inputField"
                    type="text"
                    placeholder="Enter Username"
                    onChange={this.handleUsername}
                    value={username}
                  />
                </div>
                <div className="inputFieldContainer">
                  <div>
                    <img
                      className="inputFieldImage"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                    />
                  </div>
                  <input
                    className="inputField"
                    type="password"
                    placeholder="Enter Password"
                    onChange={this.handlePassword}
                    value={password}
                  />
                </div>
                <div className="addButtonStyle">
                  <button>Add</button>
                </div>
              </form>
            </div>
            <div className="password-manager-image">
              <img
                className="passwordImageManager"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
              />
            </div>
          </div>
          <div className="stored-passwords-container">
            <div className="stored-header-part">
              <div className="heading-store">
                <h1>Your Passwords</h1>
                <span className="password-count">0</span>
              </div>

              <div className="password-search-field">
                <div className="searchImgContainer">
                  <img
                    className="searchImg"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                  />
                </div>

                <input
                  type="search"
                  placeholder="Search"
                  className="searchInputField"
                  onChange={this.handleSearch}
                />
              </div>
            </div>
            <div className="passwords-list-container">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="checkItem"
                  className="checkboxItem"
                  onChange={this.showHidePassword}
                />
                <label htmlFor="checkItem" className="checkboxItem">
                  Show Passwords
                </label>
              </div>
              {passwordInfo.length !== 0
                ? this.renderPasswords()
                : this.renderNoPassword()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordManager;
