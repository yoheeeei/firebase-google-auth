import React from "react";
import firebase from "./modules/firebase";

interface Props {}

interface State {
  user: firebase.User | null;
}

class App extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  login() {
    const propvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(propvider)
      .then(result => {
        alert("login success");
      });
  }

  logout() {
    firebase.auth().signOut();
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <p>UID: {user ? user && user.uid : ""}</p>
        {user ? (
          <button onClick={this.logout}>Logout</button>
        ) : (
          <button onClick={this.login}>Login</button>
        )}
      </div>
    );
  }
}

export default App;
