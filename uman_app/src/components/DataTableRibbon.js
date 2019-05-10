import React from 'react';
import { Grid, Header, Divider, Button, Form } from 'semantic-ui-react';

class DataTableRibbon extends React.Component {
  state = {
    showAdd: false
  }

  handleShowAdd = () => {
    const toggle = !this.state.showAdd;
    this.setState({ showAdd: toggle });
  }

  render() {
    const inputForm = this.state.showAdd ? (
      <div>
        <Form>
          <Form.Group inline>
            <Form.Input label='Name' placeholder='Name' />
            <Form.Input label='Email' placeholder='Email' />
            <Form.Input label='Birthday' placeholder='Birthday' />
            <Form.Input label='Zipcode' placeholder='Zipcode' />
            <Button positive onClick={this.handleAddUser}> Add </Button>
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
              <Button negative onClick={this.handleDeleteuser}> Delete User </Button> 
            </div>
          </Grid.Column>
        </Grid>
        <Divider/>
        {inputForm}
      </div>
    );
  }
}

export default DataTableRibbon;
