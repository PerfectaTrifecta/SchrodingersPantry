import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

interface PreviewProps {
    id: number;
    title: string;
}

const RecipePreview: React.FC<PreviewProps> = ({ id, title }) => {
    return (
        <Card
            // sx={{ maxWidth: 345 }}
            style={{
                alignContent: 'space around',
                justifyContent: 'space-evenly',
                margin: '16px',
                maxWidth: '600px',
                width: '90%',
            }}
        >
            <CardActionArea>
                <CardMedia
                    component='img'
                    height='250'
                    // image={/add images to recipe creation, render recipe thumbnails here}
                    alt='green iguana'
                /> 
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        { title }
                    </Typography>  
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link
                    to={{ pathname: '/recipe_view', state: { idMeal: id } }}
                >
                    <Button size='small' color='primary'>
                        Go To Recipe
                    </Button> 
                </Link>
            </CardActions>
        </Card>
    );
};

export default RecipePreview;