import React from "react";

import WithLayout from "@/components/WithLayout";
import MainLayout from "@/layouts/MainLayout";
import Landing from "@/views/Landing";

const Home = () => {
  return (
    <React.Fragment>
      <WithLayout layout={MainLayout} component={Landing} />
    </React.Fragment>
  );
};

export default Home;
