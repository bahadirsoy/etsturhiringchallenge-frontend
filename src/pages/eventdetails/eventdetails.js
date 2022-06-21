
//import styles
import './eventdetails.styles.css'

//import mu components
import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Card from '@mui/material/Card';
import React, { useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

//import react router
import { useParams } from 'react-router-dom';

//import axios
import Axios from 'axios'

//import hooks
import { useState } from 'react';

//import react uuid
import uuid from 'react-uuid'

//import components
import GoogleMaps from '../../components/googlemaps/googlemaps.component';


const EventDetails = (props) => {

    //eventId parameter to know which specific event we will fetch
    const { eventId } = useParams();

    //store event informations
    const [eventInfo, setEventInfo] = useState('')

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

    //eventTypeName, eventCityName and eventLocationName
    const [eventTypeName, setEventTypeName] = useState('')
    const [eventCityName, setEventCityName] = useState('')
    const [eventLocationName, setEventLocationName] = useState('')

    useEffect(() => {
        //fetch event info
        Axios.get("http://localhost:3001/api/getEventByEventId", {
            params: {
                eventId: eventId
            }
        })
        .then((response) => {
            setEventInfo(response.data)

            /* fetch eventTypeName, eventCityName and eventLocationName */
            //fetch eventTypeName
            Axios.get("http://localhost:3001/api/getEventTypeName", {
                params: {
                    eventTypeID: response.data.eventTypeID
                }
            })
            .then((response) => {
                setEventTypeName(response.data)
            })

            //fetch eventCityName
            Axios.get("http://localhost:3001/api/getEventCityName", {
                params: {
                    eventCityID: response.data.eventCityID
                }
            })
            .then((response) => {
                setEventCityName(response.data)
            })

            //fetch eventLocationName
            Axios.get("http://localhost:3001/api/getEventLocationName", {
                params: {
                    eventLocationID: response.data.eventLocationID
                }
            })
            .then((response) => {
                setEventLocationName(response.data)
            })
            /* end of fetching eventTypeName, eventCityName and eventLocationName */
        })
    }, [])

    //tab panel variables
    const [value, setValue] = useState(0)
    const handleTabs = (e, val) => {
        setValue(val)
    }

    return(
        <>
            <Grid container>
                <Grid item xs={2}></Grid>

                <Grid item xs={8}>
                    <Card>
                        {/* event images */}
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

                        {/* event informations */}
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="div">
                                {eventInfo.eventName}
                            </Typography>

                            <Typography variant="subtitle1" fontSize={"24px"}>
                                {
                                    eventInfo ?
                                    convertTime(eventInfo.eventStartDate) + " - " + convertTime(eventInfo.eventEndDate)
                                    : null
                                }
                            </Typography>

                            <Typography variant="subtitle2" color="text.secondary" align='left' display={"inline-block"} style={{width: "50%"}} fontSize={"18px"} >
                                {
                                    eventTypeName ?
                                    eventTypeName
                                    : null
                                }
                            </Typography>

                            <Typography variant="subtitle2" color="text.secondary" align='right' display={"inline-block"} style={{width: "50%"}} fontSize={"18px"} >
                                {
                                    eventLocationName ?
                                    eventLocationName
                                    : null
                                }
                            </Typography>

                            <Typography variant="subtitle1" fontSize={"24px"} className="mt-4">
                                {eventInfo.eventExplanation}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={2}></Grid>

                <Grid item xs={2}></Grid>

                {/* address and price list */}
                <Grid item xs={8}>
                    <Box sx={{ width: '100%', backgroundColor: '#d9d9d9' }} className="mt-5" >
                        <Tabs value={value} onChange={handleTabs} centered>
                            <Tab label="Adres"/>
                            <Tab label="Bilet Fiyatları"/>
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <GoogleMaps
                            eventLocationLat = {eventInfo.eventLocationLat}
                            eventLocationLng = {eventInfo.eventLocationLng}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1} className="d-flex justify-content-center">
                        <List
                            sx={{
                                width: '100%',
                                maxWidth: 400,
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 300,
                                '& ul': { padding: 0 },
                                marginX: 'auto'
                            }}
                            subheader={<li />}
                            >
                            <li>
                                <ul>
                                    {
                                        eventInfo ?
                                        eventInfo.eventPrices.split(" ").map((price, i) => {
                                            return(
                                                <ListItem key={uuid()}>
                                                    <ListItemText primary={`Kategori ${i+1}:  ${price}₺`} />
                                                </ListItem>
                                            )
                                        })
                                        : null
                                    }
                                </ul>
                            </li>
                        </List>
                    </TabPanel>
                </Grid>

                <Grid item xs={2}></Grid>
                
            </Grid>
        </>
    )
}

{/* individual tab panel */}
const TabPanel = (props) => {
    return(
        <div>
            {
                props.value === props.index && (
                    <h1>{props.children}</h1>
                )
            }
        </div>
    )
}

export default EventDetails;