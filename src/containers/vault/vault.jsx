import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import VaultColumn from '../../components/vaultColumn/vaultColumn';
import MyProjects from '../../components/myProjects/myProjects';
import { getProjects } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import JSON from '../../db.json';


class MyVault extends Component {

  componentWillMount(){
    this.props.getProjects(JSON)

  }

  render() {
    return (
      <main className="grid-x myVault" >

        <div className="cell grid-x large-4">
          <div className="cell large-9 vaultColumn">
            <VaultColumn />
          </div>
        </div>


        <div id="myProjects" className="grid-y large-4 cell align-center">
          <div className="grid-y large-10">
            <MyProjects
              projects={this.props.projects}
            />
          </div>
        </div>


        <div id="myUpdates" className="grid-y large-4 cell align-center">
          <div className="grid-x large-10">

          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return { projects: state.projects }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({ getProjects }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyVault);
