

const SideBar = (props) => {

    return (
        <div className="sidebarStyle">
            Longitude: {props.lng} | Latitude: {props.lat} | Zoom: {props.zoom}
        </div>
    )
}