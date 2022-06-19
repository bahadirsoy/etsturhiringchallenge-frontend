
//import styles
import './event.styles.css'

//import mu components
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//import axios
import Axios from 'axios'

//import hooks
import { useEffect, useState } from 'react';

function Event(props){

    //event details
    const [eventTypeName, setEventTypeName] = useState()
    const [eventCityName, setEventCityName] = useState()
    const [eventLocationName, setEventLocationName] = useState()
    
    //fetch event details
    useEffect(() => {
        //fetch eventTypeName
        Axios.get("http://localhost:3001/api/getEventTypeName", {
            params: {
                eventTypeID: props.eventTypeID
            }
        })
        .then((response) => {
            setEventTypeName(response.data)
        })

        //fetch eventCityName
        Axios.get("http://localhost:3001/api/getEventCityName", {
            params: {
                eventCityID: props.eventCityID
            }
        })
        .then((response) => {
            setEventCityName(response.data)
        })

        //fetch eventLocationName
        Axios.get("http://localhost:3001/api/getEventLocationName", {
            params: {
                eventLocationID: props.eventLocationID
            }
        })
        .then((response) => {
            setEventLocationName(response.data)
        })
    }, [])

    return(
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {props.eventName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {eventTypeName ? eventTypeName : null}
                    {eventCityName ? eventCityName : null}
                    {eventLocationName ? eventLocationName : null}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Event;