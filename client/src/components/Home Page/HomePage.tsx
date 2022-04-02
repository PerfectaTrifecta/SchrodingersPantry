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
            subtitle={'Sign-In with Google to get started'}
            flipped={true}
            loggedIn={loggedIn}
          />
        </div>
      )}
    </div>
    // <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
    //   {/* <TextToSpeech /> */}

    //   {dummyData.map(({ title, user, image, recipe }: RecipeBox) => {
    //     return (
    //       <div
    //         key={title + user}
    //         style={{
    //           maxWidth: '600px',
    //           width: '90%',
    //           padding: '1rem',
    //           margin: '1rem 0',
    //           boxShadow: `-2px 2px 0.25rem rgba(25, 25, 25, 0.1), 2px -2px 0.15rem ${theme.palette.secondary.main}`,

    //           display: 'flex',
    //           flexFlow: 'column',
    //           alignItems: 'center',
    //           borderRadius: '0.25rem',
    //         }}
    //       >
    //         <div
    //           style={{
    //             width: '80%',
    //             maxWidth: '400px',
    //             borderRadius: '0.25rem',
    //             overflow: 'hidden',
    //             boxShadow:
    //               '-2px 2px 0.25rem rgba(25, 25, 25, 0.1), 2px -2px 0.15rem rgba(175, 175, 175, 0.25)',
    //           }}
    //         >
    //           <img
    //             src={image}
    //             width='100%'
    //             style={{ display: 'block', marginBottom: '0' }}
    //           />
    //         </div>
    //         <ul>
    //           <li>Name: {title}</li>
    //           <li>Ingredients: {recipe}</li>
    //           <li>Creator: {user}</li>
    //         </ul>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default HomePage;
