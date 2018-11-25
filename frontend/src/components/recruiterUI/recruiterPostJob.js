import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navbar from "./navbarHome";
import Footer from "./footer";
var moment = require("moment");
// import traveldash from "../reducers/traveldash";

class PostJob extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      jobId: 0,
      jobTitle: "",
      jobDescription: "",
      industry: "",
      employmentType: "",
      location: "",
      jobFunction: "",
      jobOpenings: 0,
      companyName: "",
      selectedFile: "",
      authFlag: false,
      errorMessage: ""
    };
    //Bind the handlers to this class
    // this.nameChangeHandler = this.nameChangeHandler.bind(this);
    // this.locationChangeHandler = this.locationChangeHandler.bind(this);
    // this.checkinChangeHandler = this.checkinChangeHandler.bind(this);
    // this.checkoutChangeHandler = this.checkoutChangeHandler.bind(this);
    // this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
    // this.submitProperty = this.submitProperty.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
      message: ""
    });
  }

  //username change handler to update state variable with the text entered by the user
  jobIDChangeHandler = e => {
    this.setState({
      jobId: e.target.value
    });
  };
  jobOpeningsChangeHandler = e => {
    this.setState({
      jobOpenings: e.target.value
    });
  };

  jobTitleChangeHandler = e => {
    this.setState({
      jobTitle: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  locationChangeHandler = e => {
    this.setState({
      location: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  jobDescriptionChangeHandler = e => {
    this.setState({
      jobDescription: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  industryChangeHandler = e => {
    this.setState({
      industry: e.target.value
    });
  };

  employmentTypeChangeHandler = e => {
    this.setState({
      employmentType: e.target.value
    });
  };

  jobFunctionChangeHandler = e => {
    this.setState({
      jobFunction: e.target.value
    });
  };

  companyNameChangeHandler = e => {
    this.setState({
      companyName: e.target.value
    });
  };

  //for setting image description
  onChange = e => {
    if (e.target.name === "selectedFile") {
      this.setState({
        selectedFile: e.target.files[0]
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  //submit Property handler to send a request to the node backend
  submitJob = e => {
    var headers = new Headers();
    //const { description, selectedFile } = this.state;
    let formData = new FormData();
    if (
      //   this.state.name == "" ||
      //   this.state.propertydescription == "" ||
      //   this.state.location == "" ||
      //   this.state.checkin == "" ||
      //   this.state.checkout == "" ||
      //   this.state.type == "" ||
      //   this.state.guests == "" ||
      //   this.state.bedroom == "" ||
      this.state.bathroom == ""
      //   this.state.price == "" ||
      //   this.state.amenities == "" ||
      //   this.state.description == "" ||
      //   this.state.selectedFile == ""
    ) {
      this.setState({
        errorMessage: "Please fill all the fields "
      });
    } else {
      //prevent page from refresh
      e.preventDefault();
      var logo = this.state.jobId + this.state.companyName;
      var date = moment().toDate();
      date = moment(date).format("MM/DD/YYYY");

      const data = {
        recruiterEmail: localStorage.getItem("email"),
        jobId: this.state.jobId,
        jobTitle: this.state.jobTitle,
        jobDescription: this.state.jobDescription,
        industry: this.state.industry,
        employmentType: this.state.employmentType,
        location: this.state.location,
        jobFunction: this.state.jobFunction,
        jobOpenings: this.state.jobOpenings,
        postedOn: date,
        companyName: this.state.companyName,
        companyLogo: logo,
        selectedFile: this.state.selectedFile
      };
      formData.append("companyLogo", data.companyLogo);
      formData.append("selectedFile", data.selectedFile);
      //   formData.append("selectedFile", data.name);
      console.log("Job to be added:", data);
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post("http://localhost:3001/recruiter/addJob", data)
        .then(response => {
          console.log("Status Code : ", response.data);
          if (response.status === 200) {
            this.setState({
              authFlag: true
              // message:
              //   "Congratulations! Your property has been listed. Go to dashboard to view it"
            });
            axios
              .post("http://localhost:3001/recruiter/addLogo", formData)
              .then(result => {
                // access results...
              });
          } else {
            this.setState({
              authFlag: false,
              message: "Properry Already Exist "
            });
          }
        });
    }
  };

  render() {
    const { description, selectedFile } = this.state;
    //redirect based on successful login
    let redirectVar = null;
    if (this.state.authFlag) {
      redirectVar = <Redirect to="/recruiter/home" />;
    }
    // var redirect = null;
    // if (
    //   !localStorage.getItem("type") ||
    //   localStorage.getItem("type") == "traveller"
    // ) {
    //   redirect = <Redirect to="/login" />;
    // }
    return (
      <div>
        {redirectVar}
        {/* {redirect} */}
        <Navbar
          navdata={this.props.navdata}
          style={{ backgroundColor: "white" }}
        />
        <div
          class="container-fluid"
          style={{
            backgroundColor: "#f5f5f5"
          }}
        >
          <div class="login-form">
            <div
              class="main-div-login col-md-7"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "white",
                height: "auto",
                marginTop: "2%",
                marginLeft: "20%",
                padding: "20px",
                marginBottom: "20px"
              }}
            >
              <div>
                <header class="projects-actions-bar__title-bar">
                  {/* <img src={logo} alt="gg" /> */}
                  <h2
                    data-test-roles-title=""
                    class="projects-actions-bar__title"
                    style={{
                      color: "rgba(0,0,0,.9)",
                      textAlign: "center",
                      fontSize: "3.5rem",
                      fontWeight: "normal"
                    }}
                  >
                    Hello {localStorage.getItem("firstName")},
                  </h2>
                  <h4 style={{ textAlign: "center" }}>
                    Please enter respective job details
                  </h4>
                </header>

                <p
                  style={{
                    fontSize: "24px",
                    color: "red",
                    // textAlign: "center",
                    padding: "6px"
                  }}
                >
                  {this.state.errorMessage}
                </p>
              </div>
              <div>
                <div className="row">
                  <div
                    style={{
                      textAlign: "center",
                      color: "rgba(0,0,0,.9)",
                      paddingTop: "6px",
                      fontWeight: "bold",
                      fontSize: "1.5rem"
                    }}
                    class="form-group form-group-lg col-md-2"
                  >
                    <label for="currentpassword">Job ID:</label>
                  </div>
                  <div className="left col-md-10 ">
                    <input
                      type="number"
                      class="form-control"
                      id="jobID"
                      placeholder="Job ID"
                      name="jobID"
                      onChange={this.jobIDChangeHandler}
                      style={{ marginBottom: "20px" }}
                    />
                  </div>{" "}
                </div>
                <div className="row">
                  <div
                    style={{
                      textAlign: "center",
                      color: "rgba(0,0,0,.9)",
                      paddingTop: "6px",
                      fontWeight: "bold",
                      fontSize: "1.5rem"
                    }}
                    class="form-group form-group-lg col-md-2"
                  >
                    <label for="currentpassword">Job Title:</label>
                  </div>
                  <div className="left col-md-10 ">
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="Job Title"
                      name="title"
                      onChange={this.jobTitleChangeHandler}
                      style={{ marginBottom: "20px" }}
                    />
                  </div>{" "}
                </div>
                <div className="row">
                  <div
                    style={{
                      textAlign: "center",
                      color: "rgba(0,0,0,.9)",
                      paddingTop: "6px",
                      fontWeight: "bold",
                      fontSize: "1.5rem"
                    }}
                    class="form-group form-group-lg col-md-2"
                  >
                    <label for="currentpassword"> Description:</label>
                  </div>
                  <div className="left col-md-10 ">
                    <input
                      type="text"
                      class="form-control"
                      id="jobDescription"
                      placeholder="Job Description"
                      name="jobDescription"
                      onChange={this.jobDescriptionChangeHandler}
                      style={{ marginBottom: "20px" }}
                    />
                  </div>{" "}
                </div>

                <div className="row">
                  <div
                    style={{
                      textAlign: "center",
                      color: "rgba(0,0,0,.9)",
                      paddingTop: "6px",
                      fontWeight: "bold",
                      fontSize: "1.5rem"
                    }}
                    class="form-group form-group-lg col-md-2"
                  >
                    <label for="currentpassword">Industry:</label>
                  </div>
                  <div className="left col-md-10 ">
                    <input
                      type="text"
                      class="form-control"
                      id="industry"
                      placeholder="Industry"
                      name="industry"
                      onChange={this.industryChangeHandler}
                      style={{ marginBottom: "20px" }}
                    />
                  </div>{" "}
                </div>

                <div className="row">
                  <div
                    style={{
                      textAlign: "center",
                      color: "rgba(0,0,0,.9)",
                      paddingTop: "6px",
                      fontWeight: "bold",
                      fontSize: "1.5rem"
                    }}
                    class="form-group form-group-lg col-md-2"
                  >
                    <label for="currentpassword"> Type</label>
                  </div>
                  <div className="left col-md-10 ">
                    <input
                      type="text"
                      class="form-control"
                      id="employmentType"
                      placeholder="Employment Type"
                      name="employmentType"
                      onChange={this.employmentTypeChangeHandler}
                      style={{ marginBottom: "20px" }}
                    />
                  </div>{" "}
                </div>
                <div className="row">
                  <div
                    style={{
                      textAlign: "center",
                      color: "rgba(0,0,0,.9)",
                      paddingTop: "6px",
                      fontWeight: "bold",
                      fontSize: "1.5rem"
                    }}
                    class="form-group form-group-lg col-md-2"
                  >
                    <label for="currentpassword">Location:</label>
                  </div>
                  <div className="left col-md-10 ">
                    <input
                      type="text"
                      class="form-control"
                      id="location"
                      placeholder="Location"
                      name="location"
                      onChange={this.locationChangeHandler}
                      style={{ marginBottom: "20px" }}
                    />
                  </div>{" "}
                </div>
                <div className="row">
                  <div
                    style={{
                      textAlign: "center",
                      color: "rgba(0,0,0,.9)",
                      paddingTop: "6px",
                      fontWeight: "bold",
                      fontSize: "1.5rem"
                    }}
                    class="form-group form-group-lg col-md-2"
                  >
                    <label for="currentpassword">Job Function:</label>
                  </div>
                  <div className="left col-md-10 ">
                    <input
                      type="text"
                      class="form-control"
                      id="jobFunction"
                      placeholder="Job Function"
                      name="jobFunction"
                      onChange={this.jobFunctionChangeHandler}
                      style={{ marginBottom: "20px" }}
                    />
                  </div>{" "}
                </div>
                <div className="row">
                  <div
                    style={{
                      textAlign: "center",
                      color: "rgba(0,0,0,.9)",
                      paddingTop: "6px",
                      fontWeight: "bold",
                      fontSize: "1.5rem"
                    }}
                    class="form-group form-group-lg col-md-2"
                  >
                    <label for="currentpassword">Job openings:</label>
                  </div>
                  <div className="left col-md-10 ">
                    <input
                      type="number"
                      class="form-control"
                      id="jobOpenings"
                      placeholder="Number of job openings"
                      name="jobOpenings"
                      onChange={this.jobOpeningsChangeHandler}
                      style={{ marginBottom: "20px" }}
                    />
                  </div>{" "}
                </div>

                <div className="row">
                  <div
                    style={{
                      textAlign: "center",
                      color: "rgba(0,0,0,.9)",
                      paddingTop: "6px",
                      fontWeight: "bold",
                      fontSize: "1.5rem"
                    }}
                    class="form-group form-group-lg col-md-2"
                  >
                    <label for="currentpassword"> Company </label>
                  </div>
                  <div className="left col-md-10 ">
                    <input
                      type="text"
                      class="form-control"
                      id="companyName"
                      placeholder="Company Name"
                      name="companyName"
                      onChange={this.companyNameChangeHandler}
                      style={{ marginBottom: "20px" }}
                    />
                  </div>{" "}
                </div>
                <div className="row">
                  <div
                    style={{
                      textAlign: "center",
                      color: "rgba(0,0,0,.9)",
                      paddingTop: "6px",
                      fontWeight: "bold",
                      fontSize: "1.5rem"
                    }}
                    class="form-group form-group-lg col-md-2"
                  >
                    <label for="currentpassword"> Logo:</label>
                  </div>
                  <div className="left col-md-10 ">
                    <input
                      class="form-control"
                      type="file"
                      id="selectedFile"
                      placeholder="Logo"
                      name="selectedFile"
                      multiple
                      placeholder="Images"
                      onChange={this.onChange}
                      style={{ marginBottom: "20px" }}
                    />
                  </div>{" "}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary col-md-3"
                  style={{
                    fontWeight: "bold",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    cursor: "pointer",
                    textAlign: "center",
                    textShadow: "0 1px 1px rgba(0,0,0,0.35)",
                    marginBottom: "20px",
                    marginLeft: "37%"
                  }}
                  onClick={this.submitJob}
                >
                  Submit Job
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f5f5f5"
          }}
        >
          <Footer footdata={this.props.footdata} />
        </div>
      </div>
    );
  }
}
//export Login Component
export default PostJob;