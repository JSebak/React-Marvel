import React from "react";
import { Navbar, Container, Form } from "react-bootstrap";

const HeaderBar = ({ keyword, updateSearch }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <img src="MARVEL.png" alt="Marvel" style={{ height: "70px" }}></img>
      <Container className="justify-content-end">
        <Form>
          <label htmlFor="header-search"></label>
          <input
            className="searchBar"
            type="text"
            key="random1"
            value={keyword}
            placeholder={"search character"}
            onChange={(e) => updateSearch(e.target.value)}
          />
        </Form>
      </Container>
    </Navbar>
  );
};
export default HeaderBar;
