import React, { useState, useEffect } from "react";
import "./CharacterList.css";
import Character from "./Character";
import { GetCharacters } from "./../../Services/MarvelServices/CharacterService";
import ReactPaginate from "react-paginate";
import Select from "react-select";

function CharacterList(props) {
  const [characters, setCharacters] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const [search, setSearch] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchTotal, setSearchTotal] = useState(0);
  const [filter, setFilter] = useState("NA");
  let data = [...search];

  const charactersPerPage = 10;
  const options = [
    { value: "NA", label: "Name Ascending" },
    { value: "ND", label: "Name Descending" },
    { value: "CA", label: "Creation Date Ascending" },
    { value: "CD", label: "Creation Date Descending" },
  ];
  let charactersVisited = pageNumber * charactersPerPage;

  const getCharacters = async () => {
    var res;
    props.updateLoading(true);
    const result = await GetCharacters();
    if (result.code === "RequestThrottled" || result === null)
      res = [
        {
          id: 1,
          name: "Thor",
          description: "Asgardian God of thunder",
          thumbnail: {
            path: "https://m.media-amazon.com/images/I/61s2BZq0TML._AC_SY741_",
            extension: "jpg",
            comics: {
              items: [
                {
                  resourceURI: "",
                  name: "comic1",
                },
                {
                  resourceURI: "",
                  name: "comic2",
                },
                {
                  resourceURI: "",
                  name: "comic3",
                },
                {
                  resourceURI: "",
                  name: "comic4",
                },
              ],
            },
          },
        },
        {
          id: 2,
          name: "Thor2",
          description: "Asgardian God of thunder",
          thumbnail: {
            path: "https://m.media-amazon.com/images/I/61s2BZq0TML._AC_SY741_",
            extension: "jpg",
          },
        },
        {
          id: 3,
          name: "Thor3",
          description: "Asgardian God of thunder",
          thumbnail: {
            path: "https://m.media-amazon.com/images/I/61s2BZq0TML._AC_SY741_",
            extension: "jpg",
          },
        },
      ];
    else {
      res = result.data.results;
    }
    setCharacters(res);
    setSearch(res);
    setTotal(result.data.total);
    setSearchTotal(result.data.total);
    props.updateLoading(false);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharactersByName = async (characterToSearch) => {
    if (characterToSearch !== null && characterToSearch !== "") {
      setFilter("NA");
      props.updateLoading(true);
      return await GetCharacters("", characterToSearch).then((c) => {
        if (c.code !== "RequestThrottled") {
          setSearch(c.data.results);
          setSearchTotal(c.data.total);
        } else {
          setSearch(characters);
        }
        props.updateLoading(false);
      });
    } else {
      props.updateLoading(false);
      setSearchTotal(total);
      setSearch(characters);
    }
  };

  useEffect(() => {
    getCharactersByName(props.characterToSearch);
    setpageNumber(0);
    Filter(filter);
  }, [props.characterToSearch]);

  const PaginationLoad = async () => {
    props.updateLoading(true);
    await GetCharacters(search.length, props.characterToSearch).then((c) => {
      let temp = c.data.results;
      data = data.concat(temp);
      if (props.characterToSearch === "") setCharacters(data);
      setSearch(data);
      props.updateLoading(false);
    });
  };

  useEffect(() => {
    if (
      search.length > 0 &&
      (pageNumber + 1) * charactersPerPage >= search.length * 0.8 &&
      search.length < searchTotal
    ) {
      PaginationLoad();
    }
  }, [pageNumber]);

  const pageCount = Math.ceil(search.length / charactersPerPage);

  const pageChange = ({ selected }) => {
    setpageNumber(selected);
  };

  const Filter = (value) => {
    props.updateLoading(true);

    if (value?.toLowerCase().includes("n")) {
      if (value?.toLowerCase().includes("a")) {
        search?.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        search?.sort((a, b) => b.name.localeCompare(a.name));
      }
    }
    if (value?.toLowerCase().includes("c")) {
      if (value?.toLowerCase().includes("a")) {
        search?.sort((a, b) => {
          return (
            new Date(a.modified).getTime() - new Date(b.modified).getTime()
          );
        });
      } else {
        search?.sort((a, b) => {
          return (
            new Date(b.modified).getTime() - new Date(a.modified).getTime()
          );
        });
      }
    }
    props.updateLoading(false);
  };

  const displayCharacters = search
    .slice(charactersVisited, charactersVisited + charactersPerPage)
    .map((character) => {
      return (
        <div className="charactersCards col-md-4" key={character.id}>
          <Character
            character={character}
            favorites={props.favorites}
            key={character.id}
            updateFavorites={props.modifyFavorites}
            idToShow={props.idToShow}
          />
        </div>
      );
    });

  return (
    <div className="mainContainer">
      <div className="characterHeader">
        <img src="characters.png" className="characterLogo" alt="character" />
        <h1 className>Characters</h1>
      </div>
      <div className="sortSelector">
        <Select
          style={{ width: "50%", marginBottom: "20px" }}
          onChange={(entry) => {
            setFilter(entry.value);
            Filter(entry.value);
          }}
          multi={false}
          value={filter}
          options={options}
        />
      </div>

      <div className="cardsCointainer">
        {displayCharacters}
        <ReactPaginate
          previousLabel={<img src="btn_arrow_left.png" alt="previous" />}
          nextLabel={<img src="btn_arrow_right.png" alt="next" />}
          pageCount={pageCount}
          onPageChange={pageChange}
          forcePage={pageNumber}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"prevoiusBtn"}
          nextLinkClassName={"nextBtn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
}

export default CharacterList;
