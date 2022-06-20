
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

//import react router
import { Link } from 'react-router-dom';

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

    //convert timestamp to understandable date format
    const convertTime = (date) => {
        const splittedDate = date.split("-")
        let dateString = "" + splittedDate[0] + " "
        
        switch(splittedDate[1]){
            case "01":
                dateString += "Ocak"
                break;
            case "02":
                dateString += "Şubat"
                break;
            case "03":
                dateString += "Mart"
                break;
            case "04":
                dateString += "Nisan"
                break;
            case "05":
                dateString += "Mayıs"
                break;
            case "06":
                dateString += "Haziran"
                break;
            case "07":
                dateString += "Temmuz"
                break;
            case "08":
                dateString += "Ağustos"
                break;
            case "09":
                dateString += "Eylül"
                break;
            case "10":
                dateString += "Ekim"
                break;
            case "11":
                dateString += "Kasım"
                break;
            case "12":
                dateString += "Aralık"
                break;
            default:
                break;

        }
        return dateString
    }

    return(
        <Link to={`/eventdetails/${props.eventID}`}>
            <Card sx={{ maxWidth: 345 }} className="mt-5">
                <CardMedia
                    component="img"
                    height=""
                    image={`https://soyisibucket2.s3.eu-central-1.amazonaws.com/images/${props.eventImage.split(" ")[0]}`}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.eventName}
                    </Typography>

                    <Typography variant="subtitle1" fontSize={"16px"}>
                        {convertTime(props.eventStartDate)} - {convertTime(props.eventEndDate)}
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary" align='left' display={"inline-block"} style={{width: "50%"}}>
                        {eventTypeName ? eventTypeName : null}
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary" align='right' display={"inline-block"} style={{width: "50%"}}>
                        {eventLocationName ? eventLocationName : null}
                    </Typography>
                    
                </CardContent>
            </Card>
        </Link>
    )
}

export default Event;