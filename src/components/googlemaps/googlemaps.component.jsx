//import google maps api
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

//import styles
import './googlemaps.styles.css'

//import mu components
import Grid from '@mui/material/Grid';

const GoogleMaps = (props) => {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    //google maps api location variables
    const {eventLocationLat, eventLocationLng} = props
    const center = {lat: eventLocationLat, lng: eventLocationLng}

    return(
        <>
            {
                isLoaded ?
                    <>
                        <Grid container>
                            <Grid item lg={2} md={1} sm={0}></Grid>

                            <Grid item lg={8} md={10} sm={12}>
                                <GoogleMap
                                    zoom={10}
                                    center={{lat: eventLocationLat , lng: eventLocationLng}}
                                    mapContainerClassName="map-container"
                                >
                                    <Marker
                                        position={center}
                                    />
                                </GoogleMap>
                            </Grid>

                            <Grid item lg={2} md={1} sm={0}></Grid>
                        </Grid>
                    </>
                    :
                    <>
                        Loading
                    </>
            }
        </>
    )
}

export default GoogleMaps;