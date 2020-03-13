import React, { Component } from "react";
import Character from "../character/";
import { getCharacters } from "../../services/axios";

import ReactPaginate from "react-paginate";

import "./style.scss";

let totalResults = 100;

const getOffset = () => {
  const offset = Math.floor(Math.random() * totalResults + 1 - 10);
  return offset;
};

const retrieveCharacters = cb => {
  const offset = getOffset();

  return getCharacters(offset)
    .then(data => {
      totalResults = data.total;
      cb(data);
    })
    .catch(err => {
      cb(err);
    });
};

class ListCharacters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      characters: [],
      offset: 0,
      perPage: 10,
      currentPage: 0
    };
    this.updateCharactersList = this.updateCharactersList.bind(this);
    this.randomCharacters = this.randomCharacters.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    return retrieveCharacters(this.updateCharactersList);
  }

  randomCharacters() {
    this.setState({
      characters: []
    });
    return retrieveCharacters(this.updateCharactersList);
  }

  updateCharactersList(response) {
    console.log("resp: ", response);
    if (response.total > 0) {
      const data = response.results;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      console.log(slice);
      const postData = slice.map(item => (
        <Character
          key={item.id}
          name={item.name}
          description={item.name}
          thumb={item.thumbnail}
        />
      ));
      this.setState({
        characters: response.results.slice(),
        pageCount: Math.ceil(response.results.length / this.state.perPage),
        postData,
        isLoading: false
      });
    }
  }

  handlePageClick = e => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
        isLoading: true
      },
      () => {
        retrieveCharacters(this.updateCharactersList);
      }
    );
  };

  render() {
    return (
      <div className="characters">
        <header>
          <h2>Characters</h2>
        </header>
        <div>
          <button
            onClick={this.randomCharacters}
            className="characters__btn-random"
          >
            Get Characters
          </button>
        </div>

        {!this.state.isLoading ? (
          <div className="characters__list">{this.state.postData}</div>
        ) : (
          "loading..."
        )}

        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default ListCharacters;
