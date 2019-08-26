import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Tables from "./views/Tables";

export default [

  {
    path: "/",
    layout: DefaultLayout,
    component: Tables
  },

];
