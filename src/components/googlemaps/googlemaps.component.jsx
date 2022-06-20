//import google maps api
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

//import styles
import './googlemaps.styles.css'

const GoogleMaps = (props) => {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    return(
        <>
            {
                isLoaded ?
                <>
                    <GoogleMap
                    zoom={10}
                    center={{lat: 44, lng: -80}}
                    mapContainerClassName="map-container"
                    >

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