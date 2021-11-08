import "./App.css";
import { React, useState } from "react";
import CharacterList from "./Components/Characters/CharacterList";
import HeaderBar from "./Components/Common/HeaderBar";
import FavoriteList from "./Components/Favorites/FavoriteList";
import Spinner from "./Components/Common/Spinner";

function App() {
  const [inputSearch, setInputSearch] = useState("");
  const [favorites, setFavorites] = useState([15770, 21730]);
  const [isLoading, setIsLoading] = useState(false);
  const [idToShow, setIdToShow] = useState();

  const updateLoading = (loading) => {
    setIsLoading(loading);
  };
  const updateIdToShow = (comicId) => {
    setIdToShow(comicId);
  };

  const modifyFavorites = (comicId) => {
    let favs = [...favorites];
    const isFav = favorites.some((c) => c === comicId);
    if (isFav) {
      const filteredFavs = favs.filter((c) => c !== comicId);
      setFavorites(filteredFavs);
    } else {
      favs.push(comicId);
      setFavorites(favs);
    }
  };

  const updateSearch = (inputSearch) => {
    setInputSearch(inputSearch);
  };

  const style = { position: "absolute" };

  return (
    <>
      {isLoading && <Spinner color={"red"} />}
      <div className="App">
        <HeaderBar
          input={inputSearch}
          updateSearch={updateSearch}
          sticky="top"
        />
        <div className="Dashboard">
          <CharacterList
            characterToSearch={inputSearch}
            favorites={favorites}
            modifyFavorites={modifyFavorites}
            updateLoading={updateLoading}
            idToShow={idToShow}
          />
          <FavoriteList
            favorites={favorites}
            modifyFavorites={modifyFavorites}
            updateLoading={updateLoading}
            updateIdToShow={updateIdToShow}
          />
        </div>
      </div>
    </>
  );
}

export default App;
