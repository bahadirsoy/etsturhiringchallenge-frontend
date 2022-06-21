
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
import TextField from '@mui/material/TextField';

//import axios
import Axios from 'axios'

//import hooks
import { useEffect, useState } from 'react';

//import react uuid
import uuid from 'react-uuid'

//import components
import Event from '../../components/event/event.component';


const HomePage = (props) => {

    /* Filter by type variables */
    const [typeValue, setTypeValue] = useState('');

    //filter by eventType
    const filterByType = (e) => {
        //if user clicks same type
        if(typeValue == e.target.value){
            setTypeValue("")
            //filter events by other filtering
            const filteredEventsList = events.filter(event => {
                return (locationValue ? event.eventLocationID == locationValue : true)
                && (filterByNameValue ? event.eventName.toLowerCase().includes(filterByNameValue.toLowerCase()) : true)
            })
            setFilteredEvents(filteredEventsList)
        } else{ //if user clickcs another eventType, filter events by their type and other filterings
            setTypeValue(e.target.value)

            setFilteredEvents(events)
            const filteredEventsList = events.filter(event => {
                return event.eventTypeID == e.target.value 
                && (locationValue ? event.eventLocationID == locationValue : true)
                && (filterByNameValue ? event.eventName.toLowerCase().includes(filterByNameValue.toLowerCase()) : true)
            })
            setFilteredEvents(filteredEventsList)
        }

        
    };
    
    //store all eventTypeNames
    const [eventTypeNames, setEventTypeNames] = useState('');
    /* End of the filter by type variables */



    /* Filter by location variables */
    const [locationValue, setLocationValue] = useState('');

    //filter by location
    const filterByLocation = (e) => {
        //if user clicks same type
        if(locationValue == e.target.value){
            setLocationValue("")
            //filter events by other filtering
            const filteredEventsList = events.filter(event => {
                return (typeValue ? event.eventTypeID == typeValue : true)
                && (filterByNameValue ? event.eventName.toLowerCase().includes(filterByNameValue.toLowerCase()) : true)
            })
            setFilteredEvents(filteredEventsList)
        } else{ //if user clickcs another eventType, filter events by their location and other filterings
            setLocationValue(e.target.value)

            setFilteredEvents(events)
            const filteredEventsList = events.filter(event => {
                return event.eventLocationID == e.target.value 
                && (typeValue ? event.eventTypeID == typeValue : true)
                && (filterByNameValue ? event.eventName.toLowerCase().includes(filterByNameValue.toLowerCase()) : true)
            })
            setFilteredEvents(filteredEventsList)
        }

        
    };

    //store all eventLocationNames
    const [eventLocationNames, setEvenetLocationNames] = useState('')
    /* End of the filter by location variables */


    /* Filter by name vriables */
    const [filterByNameValue, setFilterByNameValue] = useState('')

    //filter by eventName
    const filterByName = (e) => {
        setFilterByNameValue(e.target.value)

        //filter events by their name and other filterings
        const filteredEvents = events.filter(event => {
            return event.eventName.toLowerCase().includes(e.target.value.toLowerCase())
            && (typeValue ? event.eventTypeID == typeValue : true) 
            && (locationValue ? event.eventLocationID == locationValue : true) 
        })
        setFilteredEvents(filteredEvents)
    }
    /* End of the filter by name variables */


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

        //get all eventLocationNames
        Axios.get("http://localhost:3001/api/getEventLocationNames", {

        })
        .then((response) => {
            //store all eventLocationNames
            setEvenetLocationNames(response.data)
        })
    }, [])

    return(
       <>
        <Grid container spacing={2}>
            <Grid item md={1} sm={0}>
                
            </Grid>

            <Grid item md={3} sm={4}>
                {/* Filter by event name */}
                <Card sx={{ maxWidth: 345 }} className="mt-4">
                    <CardContent>
                        <FormControl>
                            <Typography gutterBottom variant="h5" component="div">
                                Etkinlik adına göre ara
                            </Typography>
                            <TextField id="standard-basic" label="" variant="standard" onChange={filterByName} />
                        </FormControl>
                    </CardContent>
                </Card>

                {/* filter by eventType */}
                <Card sx={{ maxWidth: 345 }} className="mt-4">
                    <CardContent>
                        <FormControl>
                            <Typography gutterBottom variant="h5" component="div">
                                Türe Göre Filtrele
                            </Typography>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={typeValue}
                            >
                                
                            {
                                eventTypeNames ?
                                eventTypeNames.map(element => {
                                    return(
                                        <div key={uuid()}>
                                            <FormControlLabel value={element.eventTypeID} control={<Radio onClick={filterByType} />} label={element.eventTypeName} />
                                        </div>
                                    )
                                })
                                : null
                            }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                </Card>

                {/* filter by eventLocation */}
                <Card sx={{ maxWidth: 345 }} className="mt-4">
                    <CardContent>
                        <FormControl>
                            <Typography gutterBottom variant="h5" component="div">
                                Mekana Göre Filtrele
                            </Typography>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={locationValue}
                            >
                                
                            {
                                eventLocationNames ?
                                eventLocationNames.map(element => {
                                    return(
                                        <div key={uuid()}>
                                            <FormControlLabel value={element.eventLocationID} control={<Radio onClick={filterByLocation} />} label={element.eventLocationName} />
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

            {/* print all events */}
            <Grid container item md={7} sm={7} spacing={2}>
                {
                    //print all events
                    filteredEvents ? 
                    filteredEvents.map(event => {
                        return(
                            <Grid key={uuid()} item sm={12} md={6} lg={4}>
                                <Event
                                    eventID = {event.eventId}
                                    eventName = {event.eventName}
                                    eventTypeID = {event.eventTypeID}
                                    eventCityID = {event.eventCityID}
                                    eventLocationID = {event.eventLocationID}
                                    eventStartDate = {event.eventStartDate}
                                    eventEndDate = {event.eventEndDate}
                                    eventImage = {event.eventImage}
                                />
                            </Grid>
                        )
                    }) 
                    : "Loading..."
                }
            </Grid>

            <Grid item md={1} sm={0}>
                
            </Grid>
        </Grid>
       </>
    )
}

export default HomePage;