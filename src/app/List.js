/**
 * Created by uladzimir on 29.6.17.
 */
import React, {Component, PropTypes} from "react";
import Card from "./Card";
import {DropTarget} from "react-dnd";
import constants from "./constant";

//- DropTarget Methods (All optional)
//    - drop: Called when a compatible item is dropped.
//    - hover: Called when an item is hovered over the component.
//    - canDrop: Use it to specify whether the drop target is able to accept
// the item.
const listTargetSpec = {
    hover(props, monitor){
        console.log(props);
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateStatus(draggedId, props.status);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class List extends React.Component {
    render() {
        const {connectDropTarget} = this.props;
        let cards = this.props.cards.map(card => {
                return (<Card
                    key={card.id}
                    id={card.id}
                    description={card.description}
                    title={card.title}
                    color={card.color}
                    tasks={card.tasks}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}/>)
            }
        );

        return connectDropTarget(
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
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(List)