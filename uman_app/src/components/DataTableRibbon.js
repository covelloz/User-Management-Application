import React from 'react';
import { Grid, Header, Divider, Button } from 'semantic-ui-react';

class DataTableRibbon extends React.Component {
  render() {
    return(
      <div>
        <Grid>
          <Grid.Column width={4}>
            <Header as='h2'> Active User Directory </Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <div>    
              <Button positive> Add User </Button>
              <Button negative> Delete User </Button> 
            </div>
          </Grid.Column>
        </Grid>
        <Divider/>
      </div>
    );
  }
}

export default DataTableRibbon;
