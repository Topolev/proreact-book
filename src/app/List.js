/**
 * Created by uladzimir on 29.6.17.
 */
import React, {Component, PropTypes} from "react";
import {Card} from "./Card";

export class List extends React.Component {
    render() {
        let cards = this.props.cards.map(card => {
                return (<Card
                    key={card.id}
                    id={card.id}
                    description={card.description}
                    title={card.title}
                    color={card.color}
                    tasks={card.tasks}
                    taskCallbacks={this.props.taskCallbacks}/>)
            }
        );

        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );

    }
}

List.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
}