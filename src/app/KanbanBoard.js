/**
 * Created by uladzimir on 29.6.17.
 */
import React, {Component, PropTypes} from "react";
import {List} from "./List";

export class KanbanBoard extends React.Component {

    render() {
        return (
            <div>
                <List
                    cards={this.props.cards.filter((card) => card.status === "todo")}
                    title={"TO DO"}
                    taskCallbacks = {this.props.taskCallbacks}/>
                <List
                    cards={this.props.cards.filter((card) => card.status === "in-progress")}
                    title={"IN PROGRESS"}
                    taskCallbacks = {this.props.taskCallbacks}/>
                <List
                    cards={this.props.cards.filter((card) => card.status === "done")}
                    title={"DONE"}
                    taskCallbacks = {this.props.taskCallbacks}/>
            </div>
        );
    }
}

KanbanBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object)
}