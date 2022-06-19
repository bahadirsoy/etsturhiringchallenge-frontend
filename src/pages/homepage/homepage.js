
//import styles
import './homepage.styles.css'

//import mu components
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

//import axios
import Axios from 'axios'

//import hooks
import { useEffect, useState } from 'react';

//import react uuid
import uuid from 'react-uuid'

//import components
import Event from '../../components/event/event.component';


function HomePage(props){

    /* Filter by type variables */
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value)

        setFilteredEvents(events)
        const arr = events.filter(event => {
            return event.eventTypeID == e.target.value
        })
        setFilteredEvents(arr)
    };
    
    //store all eventTypeNames
    const [eventTypeNames, setEventTypeNames] = useState('');
    /* End of the filter by type variables */

    //store all events
    const [events, setEvents] = useState('')
    const [filteredEvents, setFilteredEvents] = useState('')

    //fetch all Events
    useEffect(() => {
        //get all events
        Axios.get("http://localhost:3001/api/getEvents", {

        })
        .then((response) => {
            //store all events in state variable
            setEvents(response.data)
            setFilteredEvents(response.data)
        })

        //get all eventTypeNames
        Axios.get("http://localhost:3001/api/getEventTypeNames", {

        })
        .then((response) => {
            //store all eventTypeNames
            setEventTypeNames(response.data)
        })
    }, [])

    return(
       <>
        <Grid container spacing={2}>
            <Grid item xs={1}>
                
            </Grid>

            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <FormControl>
                            <Typography gutterBottom variant="h5" component="div">
                                Türe Göre Filtrele
                            </Typography>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                            {
                                eventTypeNames ?
                                eventTypeNames.map(element => {
                                    return(
                                        <div key={uuid()}>
                                            <FormControlLabel value={element.eventTypeID} control={<Radio />} label={element.eventTypeName} />
                                        </div>
                                    )
                                })
                                : null
                            }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                </Card>
            </Grid>

            <Grid container item xs={7} spacing={2}>
                {
                    //print all events
                    filteredEvents ? 
                    filteredEvents.map(event => {
                        return(
                            <Grid key={uuid()} item sm={12} md={6} lg={4}>
                                <Event
                                    eventName = {event.eventName}
                                    eventTypeID = {event.eventTypeID}
                                    eventCityID = {event.eventCityID}
                                    eventLocationID = {event.eventLocationID}
                                    eventDate = {event.eventDate}
                                    eventImage = {event.eventImage}
                                />
                            </Grid>
                        )
                    }) 
                    : "Loading brom"
                }
            </Grid>

            <Grid item xs={1}>
                
            </Grid>
        </Grid>
       </>
    )
}

export default HomePage;