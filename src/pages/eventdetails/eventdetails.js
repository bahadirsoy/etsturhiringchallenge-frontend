
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

//import hooks
import { useState } from 'react';

//import react uuid
import uuid from 'react-uuid'


function EventDetails(props){

    //eventId parameter to know which specific event we will fetch
    const { eventId } = useParams();

    //store event informations
    const [eventInfo, setEventInfo] = useState('')

    useEffect(() => {
        //fetch eventTypeName
        Axios.get("http://localhost:3001/api/getEventByEventId", {
            params: {
                eventId: eventId
            }
        })
        .then((response) => {
            setEventInfo(response.data)
        })
    }, [])

    return(
        <>
            <Grid container>
                <Grid item xs={2}>

                </Grid>

                <Grid item xs={8}>
                    <Card>
                        <Carousel>
                            {
                                eventInfo ?
                                eventInfo.eventImage.split(" ").map((image) => {
                                    return(
                                        <Paper key={uuid()}>
                                            <img
                                            className="d-block w-100 image"
                                            src={`https://soyisibucket2.s3.eu-central-1.amazonaws.com/images/${image}`}
                                            alt="img not found"
                                            />
                                        </Paper>
                                    )
                                })
                                : null
                            }
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