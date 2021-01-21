import React from 'react';
import './App.css';
import { Component } from 'react';
import axios from 'axios';
import { Button, Table, Container, Navbar  } from 'react-bootstrap';


axios.defaults.baseURL = 'https://api.nytimes.com/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      record: { title: 'NA' }
    };
  }

  componentWillMount(){
    //get = () => {
      
      axios.get('/svc/books/v3/lists/best-sellers/history.json?api-key=vsEAg88ysz1U9kAMZprYH1VxJAmPibAA')
        .then(result => {
          console.log(result.data.results);
          this.setState({ records: result.data.results })
        });
  }

  render() {
    const bookTem = this.state.records.length > 0 ? this.state.records.map((book, index) =>  (
      <tr key={index}>
         <td>{index + 1}</td>
                <td>{book.title}</td>
                <td><Button variant="primary" onClick={() => { this.view(book.id) }}>View</Button></td>
      </tr>
    )) : <h1>Loading...</h1>
    // <div key={index}> {book.title}
    
    // <Button variant="primary" onClick={() => { this.view() }}>View</Button>{' '}
    // </div>):<h1>No Data</h1>
    return (
      <div>

        <Navbar expand="lg" variant="light" bg="dark">
          <Container>
            <Navbar.Brand href="http://localhost:3000" style={{color:"white"}}>Best-Selling Books</Navbar.Brand>
          </Container>
        </Navbar>

        
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td></td>
              </tr>        */}
              {bookTem}
            </tbody>
          </Table>

          <p className="footer">&copy; hSenid Mobile </p>
      </div>
    );
  }
  // get = () => {
  //   axios.get('/svc/books/v3/lists/best-sellers/history.json?api-key=vsEAg88ysz1U9kAMZprYH1VxJAmPibAA')
  //     .then(result => {
  //       console.log(result.data.results);
  //       this.setState({ records: result.data.results })
  //     })
    
  // }

  view = (id) => {
    axios.get('/svc/books/v3/lists/overview.json?api-key=vsEAg88ysz1U9kAMZprYH1VxJAmPibAA')
      .then(result => {
        console.log(result.data.results);
        this.setState({ records: result.data.results })
      })
    
  }
}



export default App;
