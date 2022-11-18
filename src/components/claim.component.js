import React, { Component } from "react";
import ClaimDataService from "../services/car.service";

export default class Claims extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.getClaim = this.getClaim.bind(this);
    this.updateClaim = this.updateClaim.bind(this);
    this.deleteClaim = this.deleteClaim.bind(this);

    this.state = {
      currentClaim: {
        id: null,
        description: "",
        status: "",
        date: Date.now()
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getClaim(this.props.match.params.id);
  }

  onChangeDescription(e) {
    const Description = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClaim: {
          ...prevState.currentClaim,
          Description: Description
        }
      };
    });
  }

  onChangeStatus(e) {
    const Status = e.target.value;
    
    this.setState(prevState => ({
      currentClaim: {
        ...prevState.currentClaim,
        Status: Status
      }
    }));
  }

  getClaim(id) {
    ClaimDataService.get(id)
      .then(response => {
        this.setState({
          currentClaim: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentClaim.id,
      description: this.state.currentClaim.description,
      status: this.state.currentClaim.status,
      date: this.state.currentClaim.date,
      published: status
    };

    ClaimDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentClaim: {
            ...prevState.currentClaim,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateClaim() {
    ClaimDataService.update(
      this.state.currentClaim.id,
      this.state.currentClaim
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteClaim() {    
    ClaimDataService.delete(this.state.currentClaim.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/claim')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentClaim } = this.state;

    return (
      <div>
        {currentClaim ? (
          <div className="edit-form">
            <h4>Claim</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentClaim.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  value={currentClaim.status}
                  onChange={this.onChangeStatus}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentClaim.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentClaim.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteClaim}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateClaim}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Claim...</p>
          </div>
        )}
      </div>
    );
  }
}
