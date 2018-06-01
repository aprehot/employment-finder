import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuickShare from '../quickShare/quickShare';
import { getProjects, parseFolders, parseTitles } from '../../actions';


const ProjectInfo = ({titles, index}) => {
  // console.log(titles[0].id)
  // console.log(index)
  return (
    titles ?
    titles.filter(title => title.id.toString() === index).map(proj => (
    <div key={proj.id} className="grid-y grid-frame">
      <div className="cell large-5">
        <div className="grid-y grid-frame align-center">
          <div className="cell large-7">
            <div className="grid-x align-middle align-center" style={{height:'100%'}}>
              <div className="grid-x large-9" style={{height:'100%'}}>
                <h1 style={{maxHeight:'4vh'}} className="myVault cell">{proj.title}</h1>
                <h3 style={{maxHeight:'2vh'}} className="myVault cell">{proj.studio}</h3>
                <div className="grid-x cell">
                  <div className="cell"> </div>
                  <div className="cell"> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickShare />
    </div>
  ))
     : null
  )
}

class ProjectPage extends Component {


  componentWillMount() {
    // matchProject(this.props.projects, this.props.match.params.id)
  }

  render() {
    console.log(this.props)
    let { titles } = this.props.projects
    let index = this.props.match.params.id ? this.props.match.params.id : null
    return (
      <div className="grid-x projectPage" >

        <div className="cell grid-x large-4">
          <div className="cell large-9 vaultColumn">
            <ProjectInfo titles={titles} index={index} />
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

export default connect(mapStateToProps, {getProjects, parseFolders, parseTitles})(ProjectPage);
