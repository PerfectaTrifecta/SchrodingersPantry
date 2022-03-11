import React from 'react';
import dummyData from './DummyData.js';
import useTheme from '@mui/material/styles/useTheme';

interface RecipeBox {
  title: string;
  user: string;
  image: string;
  recipe: string;
}

const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
      {/* <TextToSpeech /> */}

      {dummyData.map(({ title, user, image, recipe }: RecipeBox) => {
        return (
          <div
            key={title + user}
            style={{
              maxWidth: '600px',
              width: '90%',
              padding: '1rem',
              margin: '1rem 0',
              boxShadow: `-2px 2px 0.25rem rgba(25, 25, 25, 0.1), 2px -2px 0.15rem ${theme.palette.secondary.main}`,

              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
              borderRadius: '0.25rem',
            }}
          >
            <div
              style={{
                width: '80%',
                maxWidth: '400px',
                borderRadius: '0.25rem',
                overflow: 'hidden',
                boxShadow:
                  '-2px 2px 0.25rem rgba(25, 25, 25, 0.1), 2px -2px 0.15rem rgba(175, 175, 175, 0.25)',
              }}
            >
              <img
                src={image}
                width='100%'
                style={{ display: 'block', marginBottom: '0' }}
              />
            </div>
            <ul>
              <li>Name: {title}</li>
              <li>Ingredients: {recipe}</li>
              <li>Creator: {user}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
