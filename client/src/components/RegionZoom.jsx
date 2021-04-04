import { useMap } from "react-leaflet";
import L from "leaflet"
//function/component to adjust the center as different restaurants were clicked 
function RegionZoom(props) {
  const map = useMap();
  console.log(props.center, props.zoom)
  //newCenter & newZoom have been sent in as props from Restaurant 
  map.setView(props.center, props.zoom);

  return null;
}

export default RegionZoom;