import React from 'react';
import Dragula from 'react-dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';
import Data from './Data';
console.log(Data)

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients.filter(client => !client.status || client.status === 'backlog'),
        inProgress: clients.filter(client => client.status && client.status === 'in-progress'),
        complete: clients.filter(client => client.status && client.status === 'complete'),
      }
    }
  }
  componentDidMount () {
    Dragula(
      [document.querySelector('.Backlog'), document.querySelector('.In-Progress'), document.querySelector('.Complete')]
      ,
      {
        isContainer: el => false,
        moves: (el, source, handle, sibling) => true,
        accepts: (el, target, source, sibling) => true,
        invalid: (el, handle) => false,
        direction: 'vertical',              
        copy: false,                       
        copySortSource: false,             
        revertOnSpill: false,
        removeOnSpill: false,
        mirrorContainer: document.body,
        ignoreInputTextSelection: true,
        slideFactorX: 0,
        slideFactorY: 0,
      }
    ).on(
      'drop',
      (e, target) => {
        var currentCol = e.parentElement.classList[0]
        var valuesArr = {
          backlog: ['backlog', 'Card-grey'],
          inProgress: ['in-progress', 'Card-blue'],
          complete: ['complete', 'Card-green']
        }
        e.setAttribute('data-status', valuesArr[currentCol][0])
        e.setAttribute('class', 'Card '+valuesArr[currentCol][1])
      }
    )
  }
  getClients() {
    return Data.map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: 'backlog',
    }));
  }
  renderSwimlane(name, clients) {
    return (
      <Swimlane name={name} clients={clients}/>
    );
  }

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane('Backlog', this.state.clients.backlog)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('In-Progress', this.state.clients.inProgress)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('Complete', this.state.clients.complete)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
