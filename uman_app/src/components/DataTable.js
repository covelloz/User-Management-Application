import _ from 'lodash'
import axios from 'axios';
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Table } from 'semantic-ui-react';
import DataTableRibbon from './DataTableRibbon'


class DataTable extends React.Component {
  state = {
    column: null,
    data: [],
    direction: null,
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  componentDidMount() {
    axios.get('/uman/all-users')
      .then(res => {
        const tableData = res.data;
        this.setState({ data: tableData });
      })
  }

  render() {
    const { column, data, direction } = this.state

    return (
      <Container>
        <DataTableRibbon/>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'Id' ? direction : null}
                onClick={this.handleSort('Id')}
              >
                Id
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Name' ? direction : null}
                onClick={this.handleSort('Name')}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Email' ? direction : null}
                onClick={this.handleSort('Email')}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Birthday' ? direction : null}
                onClick={this.handleSort('Birthday')}
              >
                Birthday
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Zipcode' ? direction : null}
                onClick={this.handleSort('Zipcode')}
              >
                Zipcode
              </Table.HeaderCell>                            
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ Id, Name, Email, Birthday, Zipcode }) => (
              <Table.Row key={Id}>
                <Table.Cell>{Id}</Table.Cell>
                <Table.Cell>{Name}</Table.Cell>
                <Table.Cell>{Email}</Table.Cell>
                <Table.Cell>{Birthday}</Table.Cell>
                <Table.Cell>{Zipcode}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default DataTable;
