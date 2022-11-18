import React, { Component } from "react";
import TutorialDataService from "../services/car.service";
import { Link } from "react-router-dom";
import Car from "./car.component";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.retrieveCars = this.retrieveCars.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCar = this.setActiveCar.bind(this);
    this.removeAllCars = this.removeAllCars.bind(this);
    this.searchBrand = this.searchBrand.bind(this);

    this.state = {
      vehicles: [],
      currentCar: null,
      currentIndex: -1,
      searchBrand: ""
    };
  }

  componentDidMount() {
    this.retrieveCars();
  }

 onChangeBrand(e) {
    const searchBrand = e.target.value;

    this.setState({
      searchBrand: searchBrand
    });
  }

retrieveCars() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          Car: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCars();
    this.setState({
      currentCar: null,
      currentIndex: -1
    });
  }

  setActiveCar(tutorial, index) {
    this.setState({
      currentCar: tutorial,
      currentIndex: index
    });
  }

  removeAllCars() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchBrand() {
    this.setState({
      currentCar: null,
      currentIndex: -1
    });

    TutorialDataService.findByTitle(this.state.searchBrand)
      .then(response => {
        this.setState({
          Car: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchBrand, Car, currentCar, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchBrand}
              onChange={this.onChangeBrand}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchBrand}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4> Car´s List</h4>

          <ul className="list-group">
            {Car &&
              Car.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCar(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCars}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCar ? (
            <div>
              <h4>Vehicles</h4>
              <div>
                <label>
                  <strong>Brand:</strong>
                </label>{" "}
                {currentCar.Brand}
              </div>
              <div>
                <label>
                  <strong>Vin:</strong>
                </label>{" "}
                {currentCar.Vin}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCar.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/Car/" + currentCar.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Vehicle...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
