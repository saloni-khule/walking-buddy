"use client";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps';

//import reactImg from './assets/react-core-concepts.png';
import React, { useEffect, useRef, useState } from 'react'
import { Search, GpsFixed } from "@material-ui/icons"
const apiKey = 'AIzaSyAw5C1ya4c7q-ZzSmB7Ub14fTj4n2As5o4';
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';

function loadAsyncScript(src) {
    return new Promise(resolve => {
        const script = document.createElement("script");
        Object.assign(script, {
            type: "text/javascript",
            async: true,
            src
        })
        script.addEventListener("load", () => resolve(script));
        document.head.appendChild(script);
    })
}

const extractAddress = (place) => {

    const address = {
        city: "",
        state: "",
        zip: "",
        country: "",
        plain() {
            // const lang=this.lang;
            const city = this.city ? this.city + ", " : "";
            const zip = this.zip ? this.zip + ", " : "";
            const state = this.state ? this.state + ", " : "";
            return city + zip + state + this.country;
        }
    }

    if (!Array.isArray(place?.address_components)) {
        return address;
    }

    place.address_components.forEach(component => {
        const types = component.types;
        const value = component.long_name;

        if (types.includes("locality")) {
            address.city = value;
        }

        if (types.includes("administrative_area_level_2")) {
            address.state = value;
        }

        if (types.includes("postal_code")) {
            address.zip = value;
        }

        if (types.includes("country")) {
            address.country = value;
        }

    });

    return address;
}


function Gmap() {

    const searchInput = useRef(null);
    const [address, setAddress] = useState({});


    // init gmap script
    const initMapScript = () => {
        // if script already loaded
        if (window.google) {
            return Promise.resolve();
        }
        const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
        return loadAsyncScript(src);
    }

    // do something on address change
    const onChangeAddress = (autocomplete) => {
        const place = autocomplete.getPlace();
        setAddress(extractAddress(place));
    }

    // init autocomplete
    const initAutocomplete = () => {
        if (!searchInput.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));

    }


    const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
        const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
        console.log(url);
        // const lang = lng;
        searchInput.current.value = "Getting your location...";
        fetch(url)
            .then(response => response.json())
            .then(location => {
                const place = location.results[0];
                const _address = extractAddress(place);
                setAddress(_address);
                searchInput.current.value = _address.plain();
            })
    }

    // let lat;
    // let lng;

    const findMyLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                // console.log(position.coords.latitude);
                // lat = position.coords.latitude;
                // const lng = position.coords.latitude;
                reverseGeocode(position.coords)
            })
        }
    }
    //console.log(lat + "hiiiii");





    // load map script after mounted
    useEffect(() => {
        initMapScript().then(() => initAutocomplete())
    }, []);

    const getCoords = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                // lat = position.coords.latitude;
                // const lng = position.coords.latitude;
                //reverseGeocode(position.coords)
            })
        }
    }


    const position = { lat: 37.871960, lng: -122.259094 };

    return (
        <div className="App">


            {/* search bar below */}
            <div>
                <div className="search" style={{ height: "4vh" }}>
                    <span><Search /></span>
                    <input ref={searchInput} type="text" placeholder="Search location...." />
                    <button onClick={findMyLocation}><GpsFixed /></button>
                    <button onClick={getCoords}>getcoords</button>
                </div>

                <div className="address">
                    {/* <p>an:{lng}</p> */}
                    <p>City: <span>{address.city}</span></p>
                    <p>State: <span>{address.state}</span></p>
                    <p>Zip: <span>{address.zip}</span></p>
                    <p>Country: <span>{address.country}</span></p>
                </div>

            </div>


            {/* map below */}
            {/* <APIProvider apiKey='AIzaSyAw5C1ya4c7q-ZzSmB7Ub14fTj4n2As5o4'>
                <div style={{ height: "90vh" }}>
                    <Map zoom={15} center={position}></Map>
                    <Pin></Pin>


                </div>

            </APIProvider > */}
        </div>
    )
}

export default Gmap



// import { useState } from 'react';
// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   Pin,
//   InfoWindow
// } from '@vis.gl/react-google-maps';
// function Header() {
//   return (
//     <header>
//       <img src={reactImg} alt="Stylized atom" />
//       <h1>Walk Buddy</h1>
//       <p>
//         Fundamental React concepts you will need for almost any app you are
//         going to build!
//       </p>
//     </header>
//   )
// }
// function App() {
//   const position = { lat: 37.871960, lng: -122.259094 }
//   return (
    // <APIProvider apiKey='AIzaSyAw5C1ya4c7q-ZzSmB7Ub14fTj4n2As5o4'>
    //   <div style={{ height: "2vh" }}>
    //     <Map zoom={15} center={position}></Map>
    //     <Pin></Pin>
    //     {/* <Header />
    //   <main>
    //     <h2>Time to get started!</h2>
    //   </main> */}

    //   </div>
    //   <div>
    //     <span>search</span>
    //     <input type="text" />
    //   </div>
    // </APIProvider >
//   );
// }

// export default App;
