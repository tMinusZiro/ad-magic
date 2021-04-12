import { useMap } from "react-leaflet";
//function/component to adjust the center as different regions were picked 
function RegionZoom(props) {
  const map = useMap();
  //newCenter & newZoom have been sent in as props from World Map or US Map 
  map.setView(props.center, props.zoom);
  return null;
}

export default RegionZoom;