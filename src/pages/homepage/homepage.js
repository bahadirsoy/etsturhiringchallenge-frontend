
//import styles
import './homepage.styles.css'

//import mu components
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

//import axios
import Axios from 'axios'
import { useEffect, useState } from 'react';

function HomePage(props){


    //store all events
    const [events, setEvents] = useState()

    //fetch all Events
    useEffect(() => {
        Axios.get("http://localhost:3001/api/getEvents", {

        })
        .then((response) => {
            setEvents(response.data)
        })
    }, [])

    return(
       <>
        <Grid container spacing={2}>
            <Grid item xs={2}>
                
            </Grid>

            <Grid item xs={2}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, sint.
            </Grid>{events ? console.log(events) : null}

            <Grid container item xs={6} spacing={2}>
                {
                    //print all events
                    events ? 
                    events.map(event => {
                        return(
                            <Grid item xs={6} lg={4}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="/static/images/cards/contemplative-reptile.jpg"
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }) 
                    : "Loading brom"
                }
            </Grid>

            <Grid item xs={2}>
                
            </Grid>
        </Grid>
       </>
    )
}

export default HomePage;