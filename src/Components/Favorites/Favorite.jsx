import { React, useState, useEffect } from "react";
import "./Favorite.css";
import { GetComic } from "./../../Services/MarvelServices/CharacterService";

const Favorite = (props) => {
  const [comic, setComic] = useState();

  const ShowModal = () => {};

  const getComics = async () => {
    let res;
    if (props.comicId !== undefined && props.comicId !== null) {
      await GetComic(props.comicId).then((com) => {
        var data = com.data.results[0];
        if (com.code === "RequestThrottled") res = {};
        else {
          res = data;
        }
        setComic(res);
      });
    }
  };

  useEffect(() => {
    getComics();
  }, [props.comicId]);

  return (
    <>
      <div className="favoriteComic">
        <img
          src="btn-close.png"
          className="closeBtn"
          alt="close"
          onClick={() => props.modifyFavorites(comic?.id)}
        />
        <img
          className="comicCover"
          src={comic?.thumbnail.path + "." + comic?.thumbnail.extension}
          alt="imageComic"
          onClick={() => props.updateIdToShow(comic?.id)}
        />
        <div className="comicTitle">{comic?.title}</div>
      </div>
    </>
  );
};

export default Favorite;
