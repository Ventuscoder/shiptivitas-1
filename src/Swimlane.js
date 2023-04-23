import React from 'react';
import Card from './Card';
import './Swimlane.css';

export default class Swimlane extends React.Component {
  render() {
    const cards = this.props.clients.map(client => {
      return (
        <Card
          key={client.id}
          id={client.id}
          name={client.name}
          description={client.description}
          status={client.status}
        />
      );
    })
    // Correct bad prop values
    const colName = this.props.name !== 'In-Progress' ? this.props.name.toLowerCase() : 'inProgress'
    return (
      <div className="Swimlane-column">
        <div className="Swimlane-title">{this.props.name}</div>
        <div className={colName + ' ' + this.props.name + ' Swimlane-dragColumn'}>
          {cards}
        </div>
      </div>);
  }

}
