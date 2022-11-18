import React, { Component } from "react";
import TutorialDataService from "../services/car.service";

export default class Car extends Component {
  constructor(props) {
    super(props);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeVin = this.onChangeVin.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.getCar = this.getCar.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCar = this.updateCar.bind(this);
    this.deleteCar = this.deleteCar.bind(this);

    this.state = {
      currentCar: {
        id: null,
        Brand: "",
        Vin: "",
        Color:"",
        Year:"",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeBrand(e) {
    const Brand = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCar: {
          ...prevState.currentCar,
          Brand: Brand
        }
      };
    });
  }

  onChangeVin(e) {
    const Vin = e.target.value;
    
    this.setState(prevState => ({
      currentCar: {
        ...prevState.currentCar,
        Vin: Vin
      }
    }));
  }

  getCar(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentCar.id,
      Brand: this.state.currentCar.title,
      Vin: this.state.currentCar.description,
      Color:this.state.currentCar.Color,
      Year:this.state.currentCar.Year,
      published: status
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCar: {
            ...prevState.currentCar,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCar() {
    TutorialDataService.update(
      this.state.currentCar.id,
      this.state.currentCar.Brand,
      this.state.currentCar.Vin,
      this.state.currentCar.Color,
      this.state.currentCar.Year
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

  deleteCar() {    
    TutorialDataService.delete(this.state.currentCar.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/cars')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCar } = this.state;

    return (
      <div>
        {currentCar ? (
          <div className="edit-form">
            <h4>Vehicle</h4>
            <form>
              <div className="form-group">
                <label htmlFor="Brand">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  id="Brand"
                  value={currentCar.Brand}
                  onChange={this.onChangeBrand}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Vin">Vin</label>
                <input
                  type="text"
                  className="form-control"
                  id="Vin"
                  value={currentCar.Vin}
                  onChange={this.onChangeVin}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Color">Color</label>
                <input
                  type="text"
                  className="form-control"
                  id="Color"
                  value={currentCar.Color}
                  onChange={this.onChangeColor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Year">Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="Year"
                  value={currentCar.Year}
                  onChange={this.onChangeYear}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCar.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCar.published ? (
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
              onClick={this.deleteCar}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCar}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Vehicle...</p>
          </div>
        )}
      </div>
    );
  }
}
