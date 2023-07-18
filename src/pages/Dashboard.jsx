import React from "react";
import { connect } from "react-redux";
import {
  asyncGetBrands,
  asyncGetModels,
} from "../store/asyncActions/asyncGetBrands";

const Dashboard = ({ dashboard }) => {

 
  console.log(dashboard);
  return <div>Dashboard</div>;
};

export default connect((state) => ({ dashboard: state }), {
  GetBrands: asyncGetBrands,
  GetModels: asyncGetModels,
})(Dashboard);
