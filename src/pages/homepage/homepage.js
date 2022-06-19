
//import styles
import './homepage.styles.css'

//import mu components
import Grid from '@mui/material/Grid';

//import axios
import Axios from 'axios'

//import hooks
import { useEffect, useState } from 'react';

//import react uuid
import uuid from 'react-uuid'

//import components
import Event from '../../components/event/event.component';


function HomePage(props){


    //store all events
    const [events, setEvents] = useState()

    //fetch all Events
    useEffect(() => {
        //get all events
        Axios.get("http://localhost:3001/api/getEvents", {

        })
        .then((response) => {
            //store all events in state variable
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
            </Grid>

            <Grid container item xs={6} spacing={2}>
                {
                    //print all events
                    events ? 
                    events.map(event => {
                        return(
                            <Grid key={uuid()} item xs={6} lg={4}>{console.log(event)}
                                <Event
                                    eventName = {event.eventName}
                                    eventTypeID = {event.eventTypeID}
                                    eventCityID = {event.eventCityID}
                                    eventLocationID = {event.eventLocationID}
                                />
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