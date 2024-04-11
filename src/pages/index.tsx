import React from "react";

import WithLayout from "@/components/WithLayout";
import MainLayout from "@/layouts/MainLayout";
import Landing from "@/views/Landing";
import Head from "next/head";

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Synthetic AI</title>

        <meta name="description" content="Synthetic AI" key="desc" lang="en" />

        <meta
          name="keywords"
          content="ai, llm, synthetic, synthetic ai, syntheticai"
          lang="en"
        />

        <link rel="icon" href="/sai-logo.svg" sizes="any" />
      </Head>
      <WithLayout layout={MainLayout} component={Landing} />
    </React.Fragment>
  );
};

export default Home;
