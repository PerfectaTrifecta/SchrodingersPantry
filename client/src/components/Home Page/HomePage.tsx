import React, { useState } from 'react';
import PulloutMenu from './PulloutMenu';
// import dummyData from "./DummyData.js";
import { imageListClasses } from '@mui/material';
const HomePage: React.FC = () => {
  return (
    <div>
<<<<<<< HEAD
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Schrodingers_cat.svg" width="200"/>
      {/* <PulloutMenu /> */}
      {dummyData.map((recipeBox: any) => {
=======
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/9/91/Schrodingers_cat.svg'
        width='200'
      />
      <PulloutMenu />

      {/* {dummyData.map((recipeBox: any) => {
>>>>>>> df913c02bfd24ef4cb79a9f993148de470b3c783
        let { title, user, image, recipe } = recipeBox;
        return (
          <div>
            <img src={image} width='200' />
            <aside>
              <ul>
                <li>Name: {title}</li>
                <li>Ingredients: {recipe}</li>
                <li>Creator: {user}</li>
              </ul>
            </aside>
          </div>
        );
      })} */}
    </div>
  );
};

export default HomePage;
