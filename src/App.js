import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';
import googleApiLoader from './googleApiLoader.js';



module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        var _this = this;

        googleApiLoader.authLoaded(function () {
            _this.setState({authLoaded: true});

            googleApiLoader.getAuth2().currentUser.listen(function (user) {
                _this.setState({finishedLoading: true});
                if (user.getBasicProfile()) {
                    var profile = user.getBasicProfile();
                    var profileProxy = {};
                    profileProxy.id = profile.getId();
                    profileProxy.name = profile.getName();
                    profileProxy.thumb = profile.getImageUrl();
                    profileProxy.email = profile.getEmail();
                    _this.setState({loggedInUser: profileProxy});
                }
                _this.setState({isLoggedIn: user.getBasicProfile() ? true : false});
            });
        });

        googleApiLoader.clientsLoaded(function () {
            _this.setState({clientsLoaded: true});
        });
    },
    toggleSignIn: function () {
      console.log('click', googleApiLoader);
        if (!googleApiLoader.getAuth2().isSignedIn.get())
            googleApiLoader.signIn();

    },
    render: function () {

        var loggedInUserThumb = null;

        if (this.state.loggedInUser)
            loggedInUserThumb = <img src={this.state.loggedInUser.thumb} />

        var toggleLoginButton = <button onClick={this.toggleSignIn}>Login to Google</button>

        if (this.state.finishedLoading) {

            if (this.state.isLoggedIn) {

                return <div>
                {loggedInUserThumb}
                {this.state.loggedInUser.name}
                    <hr />
                    You're now free to use the Google APIs!
                    <Homepage />
                </div>
            }
            else
                return toggleLoginButton;
        }
        else {
            return <div>Loading...</div>
        }
    }
});

class App extends Component {



  render() {
    return (
      <div>
        <Homepage />
      </div>
    );
  }
}

export default App;
