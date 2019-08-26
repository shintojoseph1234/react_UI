
import React, { Component } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import PageTitle from "../components/common/PageTitle";

import Facebook from "../components/facebook";

const Tables = () => (


  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Facebook Pages" subtitle="Pages" className="text-sm-left" />
    </Row>
    {/* Facebook login button */}
    <Facebook/>

  </Container>
);

export default Tables;
