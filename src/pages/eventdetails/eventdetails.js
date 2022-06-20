
//import styles
import './eventdetails.styles.css'

//import mu components
import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Card from '@mui/material/Card';


function EventDetails(props){

    return(
        <>
            <Grid container>
                <Grid item xs={2}>

                </Grid>

                <Grid item xs={8}>
                    <Carousel>
                        <Paper>
                            <img
                            className="d-block w-100 image"
                            src={"https://scontent.fsaw1-11.fna.fbcdn.net/v/t39.30808-6/282750118_5298105680211362_2754277236672243018_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Dq4_FBQRvp8AX8_m0zN&_nc_ht=scontent.fsaw1-11.fna&oh=00_AT9rX9TKZHKF5l0ej0RxO2tGYiTcWoNbw-kg7fMg0IkNoA&oe=62B483C2"}
                            alt="img not found"
                            />
                        </Paper>
                    </Carousel>
                </Grid>

                <Grid item xs={2}>

                </Grid>
            </Grid>
        </>
    )
}

export default EventDetails;