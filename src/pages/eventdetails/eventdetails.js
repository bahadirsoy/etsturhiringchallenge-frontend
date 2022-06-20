
//import styles
import './eventdetails.styles.css'

//import mu components
import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Card from '@mui/material/Card';
import { useEffect } from 'react';

//import react router
import { useParams } from 'react-router-dom';

//import axios
import Axios from 'axios'


function EventDetails(props){

    //eventId parameter to know which specific event we will fetch
    const { eventId } = useParams();

    useEffect(() => {
        //fetch eventTypeName
        Axios.get("http://localhost:3001/api/getEventByEventId", {
            params: {
                eventId: eventId
            }
        })
        .then((response) => {
            console.log(response.data)
        })
    })

    return(
        <>
            <Grid container>
                <Grid item xs={2}>

                </Grid>

                <Grid item xs={8}>
                    <Card>
                        <Carousel>
                            <Paper>
                                <img
                                className="d-block w-100 image"
                                src={"https://scontent.fsaw1-11.fna.fbcdn.net/v/t39.30808-6/282750118_5298105680211362_2754277236672243018_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Dq4_FBQRvp8AX8_m0zN&_nc_ht=scontent.fsaw1-11.fna&oh=00_AT9rX9TKZHKF5l0ej0RxO2tGYiTcWoNbw-kg7fMg0IkNoA&oe=62B483C2"}
                                alt="img not found"
                                />
                            </Paper>
                            <Paper>
                                <img
                                className="d-block w-100 image"
                                src={"https://scontent.fsaw1-15.fna.fbcdn.net/v/t39.30808-6/280390741_5224164587605472_2974267248240525917_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=LU1DS9xHByoAX_irR-c&tn=m9YiOpHZwtvhd-PT&_nc_ht=scontent.fsaw1-15.fna&oh=00_AT_KaKKaux7-f18ZZvEVQPTBzcStTXpWgCY-XOzCALTJvA&oe=62B5B248"}
                                alt="img not found"
                                />
                            </Paper>
                        </Carousel>
                        
                    </Card>
                </Grid>

                <Grid item xs={2}>

                </Grid>
            </Grid>
        </>
    )
}

export default EventDetails;