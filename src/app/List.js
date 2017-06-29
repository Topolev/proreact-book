/**
 * Created by uladzimir on 29.6.17.
 */
import React, {Component} from "react";
import {Card} from "./Card";

export class List extends React.Component {
    render() {
        let cards = this.props.cards.map(card =>{
            return (<Card
                id={card.id}
                description={card.description}
                title={card.title}
                tasks={card.tasks}/>)});

        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );

    }
}