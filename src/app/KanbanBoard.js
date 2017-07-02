/**
 * Created by uladzimir on 29.6.17.
 */
import React, {Component, PropTypes} from "react";
import List from "./List";
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class KanbanBoard extends React.Component {

    render() {
        return (
            <div>
                <List
                    cards={this.props.cards.filter((card) => card.status === "todo")}
                    title={"TO DO"}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                    status="todo"
                />
                <List
                    cards={this.props.cards.filter((card) => card.status === "in-progress")}
                    title={"IN PROGRESS"}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                    status="in-progress"/>
                <List
                    cards={this.props.cards.filter((card) => card.status === "done")}
                    title={"DONE"}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                    status="done"/>
            </div>
        );
    }
}

KanbanBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object)
};

export default DragDropContext(HTML5Backend)(KanbanBoard);