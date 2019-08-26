import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import PageTitle from "./common/PageTitle";
import Popup from 'react-popup';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export default class Facebook extends Component {

  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

state = {
  isLoggedIn: false,
  pageList:false,
  pageDetails:false,
  updatePage:false,
  getPages:true,
  updateSuccess:false,

  userID:'',
  name:'',
  email:'',
  picture:'',
  customers: [],
}


responseFacebook = response =>
{
  if (response.status!="unknown"){
    console.log(response);
    this.setState({
      isLoggedIn:true,
      userID:response.userID,
      name:response.name,
      email:response.email,
      accessToken:response.accessToken
    });
  }
}

responseGetPages = response =>
{
  if (response.data[0].status=="success"){
    this.setState({
      pages:response.data[0].data,
      pageList:true,
      getPages:false,
    });
  }
}

responseGetPageDetails = response =>
{
  if (response.data[0].status=="success"){
    this.setState({
      page_details:response.data[0].data,
      pageDetails:true,
      pageList:false,
    });
  }
}


responseSubmit = response =>
{
  // failure
  if (response.data[0].status=="success"){
    this.setState({
      updateSuccess:true,
      updatePage:false,
      getPages:true,
    });
  }

}


pageDetails(e,page_id){

  {/*API GET pages*/}
  const url = `${API_URL}/api/page_details/${page_id}/${this.state.accessToken}/`;
  axios.get(url).then(this.responseGetPageDetails)

}

handleSubmit(event) {

  {/*API POST update info*/}
  const url = `${API_URL}/api/update_page/`;
  axios.post(url,
          {
            "page_id":"103589157682557",
            "access_token":this.state.accessToken,
            "update_data": {
                              "about": this.refs.about.value,
                              "impressum": this.refs.impressum.value,
                              "description": this.refs.description.value,
                              "phone": this.refs.phone.value
                          	}

          }).then(this.responseSubmit)

          event.preventDefault();

}

EditpageDetails(e,page_id){

  this.setState({
    updatePage:true,
  });

}



  render(){
    let fbContent;

    {/*id user loggedIn=True and updatePage=True*/}
    if (this.state.updatePage && this.state.isLoggedIn){

      fbContent = (
            <Row>
              <Col>
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">Page Info</h6>
                  </CardHeader>
                  <CardBody className="p-0 pb-3">

                  <form onSubmit={this.handleSubmit}>


                    <table className="table mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="border-0">
                            About
                          </th>
                          <th scope="col" className="border-0">
                            Impressum
                          </th>
                          <th scope="col" className="border-0">
                            description
                          </th>
                          <th scope="col" className="border-0">
                            Phone
                          </th>
                          <th scope="col" className="border-0">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                          <td><input className="form-control" type="text" ref='about' /></td>
                          <td><input className="form-control" type="text" ref="impressum" /></td>
                          <td><input className="form-control" type="text" ref="description" /></td>
                          <td><input className="form-control" type="text" ref="phone" /></td>
                          <td>
                            <input className="btn btn-primary" type="submit" value="update" />
                          </td>
                      </tbody>
                    </table>
                  </form>

                  </CardBody>
                </Card>
              </Col>

            </Row>
          )

      {/*id user pagelist=True and pageDetails=True*/}
    }else if(this.state.isLoggedIn && this.state.getPages){

      {/*API GET pages*/}
      const url = `${API_URL}/api/pages/${this.state.accessToken}/`;
      axios.get(url).then(this.responseGetPages)

      {/*if loggedIn=True and user loggedIn=True*/}
    } else if (this.state.pageList && this.state.isLoggedIn){

      fbContent = (

            <Row>
              <Col>
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">Page Info</h6>
                  </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <table className="table mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="border-0">
                            ID
                          </th>
                          <th scope="col" className="border-0">
                            Page Name
                          </th>
                          <th scope="col" className="border-0">
                            Category
                          </th>
                          <th scope="col" className="border-0">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                      {this.state.pages.map( c  =>
                          <tr  key={c.id}>
                          <td>{c.id}  </td>
                          <td>{c.name}</td>
                          <td>{c.category}</td>
                          <td>
                            <Button onClick={(e)=>  this.pageDetails(e,c.id) } variant="info">Choose Page</Button>
                          </td>
                      </tr>)}

                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )

      {/*id user pagelist=True and pageDetails=True*/}
    }else if (this.state.pageDetails && this.state.isLoggedIn){

      fbContent = (
            <Row>
              <Col>
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">Page Info</h6>
                  </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <table className="table mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="border-0">
                            ID
                          </th>
                          <th scope="col" className="border-0">
                            About
                          </th>
                          <th scope="col" className="border-0">
                            impressum
                          </th>
                          <th scope="col" className="border-0">
                            description
                          </th>
                          <th scope="col" className="border-0">
                            Phone
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                      {this.state.page_details.map( c  =>
                          <tr  key={c.id}>
                          <td>{c.id}  </td>
                          <td>{c.about}</td>
                          <td>{c.impressum}</td>
                          <td>{c.description}</td>
                          <td>{c.phone}</td>
                          <td>
                            <Button onClick={(e)=>  this.EditpageDetails(e,c.id) } variant="info">EDIT</Button>
                          </td>
                      </tr>)}

                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )

    }else{

      fbContent = (
                  <FacebookLogin
                    appId="366782854239560"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />
                  )
    }

    return (
      <div>{fbContent}</div>
    )
  }
}
