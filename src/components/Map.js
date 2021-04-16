import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import { withStyles } from "@material-ui/styles";
import { scaleQuantile } from "d3-scale";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import LinearGradient from "./LinearGradient.js";
import INDIA_TOPO_JSON from "../constants/india.topo.json";
import styles from "../styles/MapStyles";
import "../styles/MapStyles.js";


const PROJECTION_CONFIG = {
  scale: 400,
  center: [78.9629, 22.5937], // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  "#ffffff",
  "#fcb1b1",
  "#f57f7f",
  "#e35959",
  "#db3d3d",
  "#d62d2d",
  "#c91010",
  "#c90202",
  "#a60000",
  "#8f0000",
  "#7a0000",
  "#5c0000",
  "#610000",
  "#540000",
  "#420000",
  "#310000",
  "#210000",
  "#000000",


];

const DEFAULT_COLOR = "#EEE";

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#ccc",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipContent: "",
      data: [
        { id: "AP", state: "Andhra Pradesh", value: 5 },
        { id: "AR", state: "Arunachal Pradesh", value: 2 },
      ],
    };
  }

  onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      this.setState(
        {
          tooltipContent: `${geo.properties.name}: ${current.value}`,
        },
        () => this.props.currentLocation(geo.properties.name)
      );
    };
  };

  onMouseLeave = () => {
    this.setState({ tooltipContent: "" });
  };

  render() {
    const data = this.props.mapData;

    const gradientData = {
      fromColor: COLOR_RANGE[0],
      toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
      min: 0,
      max: data.reduce((max, item) => (item.value > max ? item.value : max), 0),
    };

    const colorScale = scaleQuantile()
      .domain(data.map((d) => d.value))
      .range(COLOR_RANGE);

    return (
      <div>
        <ReactTooltip>{this.state.tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={500}
          height={220}
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const current = data.find((s) => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={this.onMouseEnter(geo, current)}
                    onMouseLeave={this.onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <LinearGradient data={gradientData} />
      </div>
    );
  }
}

export default withStyles(styles)(Map);
