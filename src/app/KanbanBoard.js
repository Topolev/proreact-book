/**
 * Created by uladzimir on 29.6.17.
 */
import React, {Component} from "react";
import {List} from "./List";
import {Search} from "./Search";

export class KanbanBoard extends React.Component {

    render() {
        return (
            <div>
                <Search/>
                <List
                    cards={this.props.cards.filter((card) => card.status === "todo")}/>
                <List
                    cards={this.props.cards.filter((card) => card.status === "in-progress")}/>
                <List
                    cards={this.props.cards.filter((card) => card.status === "done")}/>
            </div>
        );
    }
}