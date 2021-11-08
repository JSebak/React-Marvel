import { React } from "react";
import Favorite from "./Favorite";
import "./FavoriteList.css";

const FavoriteList = (props) => {
  const displayFavorites = props.favorites?.map((favorite) => {
    return (
      <div className="favorite" key={favorite}>
        <Favorite
          comicId={favorite}
          key={favorite}
          modifyFavorites={props.modifyFavorites}
          updateIdToShow={props.updateIdToShow}
        />
      </div>
    );
  });

  return (
    <div className="FavSection">
      <div className="favHeader">
        <img src="favourites.png" className="favLogo" alt="favorites" />
        <h1 className="Header">Favorites</h1>
      </div>
      {displayFavorites}
    </div>
  );
};

export default FavoriteList;
