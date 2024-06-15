import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from './components/NavBar/NavBar'
import Polls from './components/Polls/Polls'
import CreatePoll from './components/CreatePoll/CreatePoll'
import About from './components/About/About';
import Provider from './components/Provider';
import Login from './components/Login'
import Signup from './components/Signup'
// import Chat from './components/Chat'
import { message } from 'antd';
import Home from './components/Home'
import './styles/App.css'
import 'antd/dist/antd.css';
// import socketIO from "socket.io-client"
import ChatPage from './components/ChatPage'

// const socket = socketIO.connect("https://polling-backend-ze8u.onrender.com")

class App extends Component {
  internetConnection = () => {
    if (!navigator.onLine) {
      message.error('Internet Connection Lost', 3);
    }
  }

  componentDidMount() {
    this.internetConnection();
    window.addEventListener('offline', this.internetConnection);
  }
  componentWillUnmount() {
    window.removeEventListener('offline', this.internetConnection);
  }
  render() {
    return (
      <Router className="App">
        <Provider>
          <Route path="/" component={Login} exact />
          <Route path="/signup" component={Signup} />
          <NavBar />
          <Route exact path="/polls" component={Polls} />
          <Route path="/create" exact component={CreatePoll} />
          <Route path="/about" exact component={About} />
          {/* <Route path="/chat" exact component={Chat} /> */}
          {/* <Route path="/chat" exact component={ChatPage} /> */}
          {/* <Route path="/joinus" component={<Home socket={socket} />}></Route> */}
          <Route path="/joinus" component={props => <Home {...props} />} />
          <Route path="/chat" component={socket => <ChatPage {...socket} />}></Route>

        </Provider>
      </Router>

    )
  }
}

export default App;
