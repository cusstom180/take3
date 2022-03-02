import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const useGeocoder = () => {
    const geocoder = new MapboxGeocoder({
        // flyTo: false,
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })

    return (map) => {
        map.addControl(geocoder);

        geocoder.on("result", function (e) {
            console.log(e.result);
        });
    }
}

export default useGeocoder;