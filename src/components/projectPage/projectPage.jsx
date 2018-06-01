import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjects, parseFolders, parseTitles, matchProject } from '../../actions';

const ProjectInfo = ({titles}) => (
  titles ?
  <div>

  </div> : null
)

class ProjectPage extends Component {


  componentWillMount() {
    // matchProject(this.props.projects, this.props.match.params.id)
  }

  render() {
    console.log(this.props.projects.titles)
    let { titles } = this.props.projects
    return (
      <div className="grid-x projectPage" >

        <div className="cell grid-x large-4">
          <div className="cell large-9 vaultColumn">
            <ProjectInfo titles={titles} />
          </div>
        </div>


        <div id="myProjects" className="grid-y large-4 cell align-center">
          <div className="grid-y large-10">


          </div>
        </div>


        <div id="myUpdates" className="grid-y large-4 cell align-center">
          <div className="grid-x large-10">

          </div>
        </div>


      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    folders:state.folders,
    titles: state.titles,
    correctPage: state.correctPage
  }
}

export default connect(mapStateToProps, {getProjects, parseFolders, parseTitles, matchProject})(ProjectPage);
