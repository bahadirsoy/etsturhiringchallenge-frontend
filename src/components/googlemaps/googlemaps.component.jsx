//import google maps api
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

//import styles
import './googlemaps.styles.css'

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
                    <GoogleMap
                        zoom={10}
                        center={{lat: eventLocationLat , lng: eventLocationLng}}
                        mapContainerClassName="map-container"
                    >
                        <Marker
                            position={center}
                        />
                    </GoogleMap>
                    
                    
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