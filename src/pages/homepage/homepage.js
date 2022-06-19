
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


function HomePage(props){

    /* Filter by type variables */
    const [typeValue, setTypeValue] = useState('');

    const filterByType = (e) => {
        if(typeValue == e.target.value){
            setTypeValue("")
            const filteredEventsList = events.filter(event => {
                return (locationValue ? event.eventLocationID == locationValue : true)
                && (filterByNameValue ? event.eventName.toLowerCase().includes(filterByNameValue.toLowerCase()) : true)
            })
            setFilteredEvents(filteredEventsList)
        } else{
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

    const filterByLocation = (e) => {
        if(locationValue == e.target.value){
            setLocationValue("")
            const filteredEventsList = events.filter(event => {
                return (typeValue ? event.eventTypeID == typeValue : true)
                && (filterByNameValue ? event.eventName.toLowerCase().includes(filterByNameValue.toLowerCase()) : true)
            })
            setFilteredEvents(filteredEventsList)
        } else{
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

    const filterByName = (e) => {
        setFilterByNameValue(e.target.value)

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
            <Grid item xs={1}>
                
            </Grid>

            <Grid item xs={3}>
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