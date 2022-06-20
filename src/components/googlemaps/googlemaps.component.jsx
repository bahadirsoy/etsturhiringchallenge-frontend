//import google maps api
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

//import styles
import './googlemaps.styles.css'

const GoogleMaps = (props) => {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    //google maps api location variables
    const center = {lat: 40, lng: 29}

    return(
        <>
            {
                isLoaded ?
                <>
                    <GoogleMap
                        zoom={10}
                        center={{lat: 40 , lng: 29}}
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