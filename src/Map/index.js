import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Marker, Source, Layer } from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";


import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

const App = () => {
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(-83.1129);
    const [lat, setLat] = useState(42.6901);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        if (!map) return; // wait for map to initialize

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: {
                color: 'orange'
            }
        });

        map.addControl(geocoder);

        // still not working
        // get center of map and ask google for info
        geocoder.on('results', function (results) {
            //console.log(results);
            map.on('moveend', () => {
                console.log(`result: ${results}`);
                console.log(`lat: ${lat}, lng: ${lng}`);
            });

        });

        map.on('load', () => {
            map.addSource('basic-copy', {
                type: 'vector',
                url: 'mapbox://cusston180.cl19gpgg52g8k28mknu2q009p-2gc4v'
            })

            map.addLayer({
                id: 'basic-copy-layer',
                type: 'line',
                source: 'basic-copy',
                paint: {
                    "line-color": "#15cc09",
                    "line-width": 4
                }, 'source-layer': 'dirt-roads-by-tom'
            });
        });


        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });




        // cleanup function to remove map on unmount
        return () => map.remove();
    }, []);

    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
};

export default App;

// export default function App() {

//     useEffect(() => {
//         if (map.current) return; // initialize map only once
//         map.current = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [lng, lat],
//             zoom: zoom
//         });



//         const geocoder = new MapboxGeocoder({
//             // flyTo: false,
//             accessToken: mapboxgl.accessToken,
//             mapboxgl: mapboxgl,
//             marker: {
//                 color: 'orange'
//             }
//         });

//         mapScope.addControl(geocoder);

//         geocoder.on('results', function (results) {
//             //console.log(results);
//             map.current.on('moveend', () => {
//                 console.log(`lat: ${lat}, lng: ${lng}`);
//             });

//         });



//         // map.current.addSource('Basic-copy', {
//         //     type: 'vector',
//         //     url: 'mapbox://cusston180.cl19gpgg52g8k28mknu2q009p-2gc4v'
//         // })

//         if (!map.current) return; // wait for map to initialize
//         map.current.on('move', () => {
//             setLng(map.current.getCenter().lng.toFixed(4));
//             setLat(map.current.getCenter().lat.toFixed(4));
//             setZoom(map.current.getZoom().toFixed(2));

//         });
//     });


//     return (
//         <div>
//             <div className="sidebar">
//                 Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//             </div>
//             <div ref={mapContainer} className="map-container" />
//         </div>
//     );
// }

        // if (!map.current) return; // wait for map to initialize
        // map.current.on('move', () => {
        //     setLng(map.current.getCenter().lng.toFixed(4));
        //     setLat(map.current.getCenter().lat.toFixed(4));
        //     setZoom(map.current.getZoom().toFixed(2));

        // });