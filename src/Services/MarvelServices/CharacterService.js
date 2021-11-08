const publicKey = "768ae247d64b5f23b417508f4ed1d3df";
const privateKey = "666030a669c778d8fd747422ce5bf01091dbce8c";
const hash = "92ca6274df30cceefca4e4dd7d951e45";
const apiKeyHash = `ts=1&apikey=${publicKey}&hash=${hash}`;
const _url = "http://gateway.marvel.com/v1/public/";

export async function GetCharacters(offset = "", name = "") {
  const endpoint = "characters";
  const _offset = "&offset=";
  const modified = "";
  const order = "";
  const limit = "&limit=100";
  let nameStartsWith = "";
  if (name !== "") {
    nameStartsWith = `&nameStartsWith=${name}`;
  }
  return await fetch(
    `${_url}${endpoint}?${apiKeyHash}${nameStartsWith}${modified}${order}${_offset}${offset}${limit}`,
    { method: "GET" }
  ).then((response) => response.json());
}

export async function GetCharacterById(id) {
  const endpoint = "characters/";
  return await fetch(`${_url}${endpoint}${id}?${apiKeyHash}`, {
    method: "GET",
  }).then((response) => response.json());
}

export async function GetComic(resourceURI) {
  const endpoint = "comics/";
  return await fetch(`${_url}${endpoint}${resourceURI}?${apiKeyHash}`, {
    method: "GET",
  }).then((response) => response.json());
}

export async function GetComicByURI(resourceURI) {
  return await fetch(`${resourceURI}?${apiKeyHash}`, {
    method: "GET",
  }).then((response) => response.json());
}
