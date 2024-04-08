import React from "react";

function WithLayout({
  layout: Layout,
  component: Component,
}: {
  layout: any;
  component: any;
}) {
  return (
    <Layout>
      <Component />
    </Layout>
  );
}

export default WithLayout;
