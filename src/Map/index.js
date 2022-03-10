import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import Route from '../Data/Routes/Stoney_Dude_Fuel_EX_9_8_.json'

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        const mapScope = map.current;

        const geocoder = new MapboxGeocoder({
            // flyTo: false,
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: {
                color: 'orange'
            }
        });

        mapScope.addControl(geocoder);

        geocoder.on('results', function (results) {
            //console.log(results);
        });

        map.current.on('moveend', () => {
            console.log(`lat: ${lat}, lng: ${lng}`);

            map.current.addSource('stoney-route', {
                type: 'geojson',
                data: Route
            });

            map.current.addLayer({
                'id': 'stoney-route',
                'type': 'line',
                'source': 'stoney-route',


            })

        });



    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));

        });

    });

    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}
