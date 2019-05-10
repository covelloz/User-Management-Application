import React from 'react';
import axios from 'axios';
import { Grid, Header, Divider, Button, Form } from 'semantic-ui-react';

class DataTableRibbon extends React.Component {
  state = {
    showAdd: false,
    showDelete: false,
    user_name: '',
    user_email: '',
    user_birthday: '',
    user_zipcode: ''
  }

  handleShowAdd = () => {
    const toggle = !this.state.showAdd;
    this.setState({ showAdd: toggle });
  }

  handleShowDelete = () => {
    const toggle = !this.state.showDelete;
    this.setState({ showDelete: toggle });
  }

  handleAddUser = () => {
    const payload = {
      user_name: this.state.user_name,
      user_email: this.state.user_email,
      user_birthday: this.state.user_birthday,
      user_zipcode: this.state.user_zipcode,
    }

    axios.post('/uman/add-user', payload)
      .then(res => {
        window.location.reload();
    })
  }

  handleDeleteUser = () => {
    const user_id = this.state.user_id
    axios.delete(`/uman/delete-user/${user_id}`)
      .then(res => {
        window.location.reload();
    })
  }

  handleChange = (event, { value }) => {
    const key = event.target.id;
    this.setState({ [key]: value });
  }

  render() {
    const inputFormAdd = this.state.showAdd ? (
      <div>
        <Form>
          <Form.Group inline>
            <Form.Input id='user_name' label='Name' placeholder='Name' onChange={this.handleChange}/>
            <Form.Input id='user_email' label='Email' placeholder='Email' onChange={this.handleChange}/>
            <Form.Input id='user_birthday' label='Birthday' placeholder='Birthday' onChange={this.handleChange}/>
            <Form.Input id='user_zipcode' label='Zipcode' placeholder='Zipcode' onChange={this.handleChange}/>
            <Button positive onClick={this.handleAddUser}> Add </Button>
          </Form.Group>
        </Form>
      </div>
    ) : null;

    const inputFormDelete = this.state.showDelete ? (
      <div>
        <Form>
          <Form.Group inline>
            <Form.Input id='user_id' label='Id' placeholder='Id' onChange={this.handleChange}/>
            <Button negative onClick={this.handleDeleteUser}> Delete </Button>
          </Form.Group>
        </Form>
      </div>
    ) : null;

    return(
      <div>
        <Grid>
          <Grid.Column width={4}>
            <Header as='h2'> Active User Directory </Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <div>    
              <Button positive onClick={this.handleShowAdd}> Add User </Button>
              <Button negative onClick={this.handleShowDelete}> Delete User </Button> 
            </div>
          </Grid.Column>
        </Grid>
        <Divider/>
        {inputFormAdd}
        {inputFormDelete}
      </div>
    );
  }
}

export default DataTableRibbon;
