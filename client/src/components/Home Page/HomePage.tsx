import React from 'react';
import dummyData from './DummyData.js';
import useTheme from '@mui/material/styles/useTheme';
import Landing from '../../Landing';
import Slider from '../../Slider';
import pantryJars from '../../img/pantryJars.jpg';
import pantry from '../../img/pantry.jpg';
import family from '../../img/family.jpg';
import lady from '../../img/lady.jpg';
import { UserContext } from '../../UserContext';
interface RecipeBox {
  title: string;
  user: string;
  image: string;
  recipe: string;
}

const HomePage: React.FC = () => {
  const theme = useTheme();
  const { loggedIn, user } = React.useContext(UserContext);

  return (
    <div
      style={{
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      {loggedIn ? (
        <div>
          <Slider
            imageSrc={pantryJars}
            title={`Welcome, ${user.userName.split(' ')[0]}!`}
            flipped={true}
            loggedIn={loggedIn}
          />
          <Slider
            imageSrc={family}
            title={'Explore flavor, your way!'}
            subtitle={
              'Our platform offers a variety of unique dishes and recipes.'
            }
          />
          <Slider
            imageSrc={lady}
            title={"Welcome Back...hope you're hungry"}
            subtitle={'choose an option from the pullout menu'}
            flipped={true}
            loggedIn={loggedIn}
          />
        </div>
      ) : (
        <div>
          <Slider
            imageSrc={pantryJars}
            title='Your Favorite Meals at Your Fingertips'
            flipped={true}
          />
          <Slider
            imageSrc={family}
            title={'Explore flavor, your way!'}
            subtitle={
              'Our platform offers a variety of unique dishes and recipes.'
            }
          />
          <Slider
            imageSrc={lady}
            title={'Browse recipes and more, in just a few clicks'}
            flipped={true}
            loggedIn={loggedIn}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
