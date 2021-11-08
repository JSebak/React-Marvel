import React from "react";
import "./Character.css";
import { useState } from "react";
import ModalComponent from "../Common/Card/ModalComponent";
import {
  GetComic,
  GetComicByURI,
} from "../../Services/MarvelServices/CharacterService";

const Character = ({
  character,
  authors,
  favorites,
  updateFavorites,
  idToShow,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const [comicShow, setComicShow] = useState(false);
  const [modalComic, setModalComic] = useState();
  const [favorite, setFavorite] = useState(false);

  function ShowCharacter() {
    setShow(!show);
  }

  function ShowComic(comic) {
    if (comic === undefined) setComicShow(!comicShow);
    else {
      GetComicByURI(comic).then((res) => {
        setModalComic(res.data.results[0]);
        if (favorites.includes(res.data.results[0].id)) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
        setComicShow(!comicShow);
      });
    }
  }

  var characterCard = (
    <div className="characterModal">
      <img
        src={character.thumbnail.path + "." + character.thumbnail.extension}
        alt={character.name}
        className="characterImage "
      />
      <div className="modalText">
        <h1>{character.name}</h1>
        <p>{character.description}</p>
      </div>
    </div>
  );

  var comicCard = (
    <>
      <div className="comicModal">
        <img
          src={
            modalComic?.thumbnail.path + "." + modalComic?.thumbnail.extension
          }
          alt={modalComic?.title}
          className="comicImage"
        />
        <div className="comicTexts">
          <h1>{modalComic?.title}</h1>
          <p>{modalComic?.description}</p>
        </div>
      </div>
      <div className="row btnRow">
        <button
          className={favorite ? "comicBtn favBtn act" : "comicBtn favBtn"}
          onClick={() => {
            changeFavorites(modalComic.id);
            setFavorite(!favorite);
          }}
        >
          <img
            src={
              favorite
                ? "btn-favourites-primary.png"
                : "btn-favourites-default.png"
            }
            alt="fav"
          />{" "}
          {favorite ? "Added to favorites" : "Add to favorites"}
        </button>
        <button className="comicBtn">
          <img src="shopping-cart-primary.png" alt="buy" /> Buy for{" "}
          {modalComic?.prices[0].price}
        </button>
      </div>
    </>
  );
  const changeFavorites = () => {
    updateFavorites(modalComic.id);
  };

  const displayComics = character?.comics.items.slice(0, 4).map((favorite) => {
    return (
      <button
        key={favorite.resourceURI}
        className="ComicItem"
        onClick={() => ShowComic(favorite.resourceURI)}
      >
        <p>{favorite.name}</p>
      </button>
    );
  });

  return (
    <div className="cardSeparation">
      <div className="card">
        <div className="card-top">
          <img
            className="modalImage"
            src={character.thumbnail.path + "." + character.thumbnail.extension}
            alt="character"
            onClick={() => ShowCharacter()}
          />
          <div>
            <div className="cardTitle">{character.name}</div>
            <div className="cardDescription">
              {character.description.length > 250
                ? `${character.description.substring(0, 250)}...`
                : character.description}
            </div>
          </div>
        </div>
        <div className="card-bottom">{displayComics}</div>
      </div>

      <ModalComponent
        show={show}
        onClose={() => ShowCharacter()}
        children={characterCard}
      />
      <ModalComponent
        show={comicShow}
        onClose={() => ShowComic()}
        children={comicCard}
      />
    </div>
  );
};

export default Character;
