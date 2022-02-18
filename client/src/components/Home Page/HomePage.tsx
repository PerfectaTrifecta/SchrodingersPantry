import React, { useState } from "react";
import PulloutMenu from "./PulloutMenu";
import dummyData from "./DummyData.js";
import { imageListClasses } from "@mui/material";


const HomePage: React.FC = () => {
  return(
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Schrodingers_cat.svg" width="200"/>
      {/* <PulloutMenu /> */}
      {dummyData.map((recipeBox: any) => {
        let { title, user, image, recipe } = recipeBox;
        return (
          <div>
            <img src={image} width="200"/>
            <aside>
              <ul>
                <li>Name: {title}</li>
                <li>Ingredients: {recipe}</li>
                <li>Creator: {user}</li>
              </ul>
            </aside>
          </div>
        )
      })}
    </div>

  )
}

export default HomePage;