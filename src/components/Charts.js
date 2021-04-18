import React, { Component } from "react";
import NumberFormat from 'react-number-format';
import { withStyles } from "@material-ui/styles";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import colors from "../constants/colors";

import styles from "../styles/ChartsStyles";

class Charts extends Component {
  render() {
    const { data, classes } = this.props;
    let result;
    try {
      const updatedData = data.slice(1).slice(-50);
      result = updatedData.map((dataItem) => {
        let newObject = {};
        for (let [key, value] of Object.entries(dataItem)) {
          if (key === "date") {
            newObject[key] = value;
          } else {
            newObject[key] = Number(value);
          }
        }
        return {
          
          ...newObject, Total_Confirmed: newObject.totalconfirmed,
          ...newObject, Total_Recovered: newObject.totalrecovered,
          ...newObject, Total_Deceased: newObject.totaldeceased,
          ...newObject,
          Total_Active:
            newObject.totalconfirmed -
            (newObject.totalrecovered + newObject.totaldeceased),
        };
      });
    } catch (err) {}

    return (
      <div className={classes.charts}>
        <ResponsiveContainer>
          <LineChart
            width={700}
            height={300}
            data={result}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend
              wrapperStyle={{
                margin: "-3rem 1rem",
              }}
            />
            <Line
              type="monotone"
              dataKey="Total_Confirmed"
              stroke={colors.red}
              dot={false}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="Total_Recovered"
              stroke={colors.green}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Total_Active"
              stroke={colors.orange}
              dot={false}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="Total_Deceased"
              stroke={colors.purple}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Charts);
