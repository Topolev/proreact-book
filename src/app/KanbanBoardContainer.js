/**
 * Created by vladimirtopolev on 29.06.17.
 */
import React, {Component, PropTypes} from "react";
import {KanbanBoard} from "./KanbanBoard";
import "whatwg-fetch";
import "babel-polyfill";
import update from "react-addons-update";

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    AUthorization: 'test'

};
export class KanbanBoardContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: []
        }
    }

    componentDidMount() {
        fetch(API_URL + '/cards', {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({cards: responseJSON})
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error)
            })
    }

    addTask(cardId, taskName) {
        let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
        let prevState = this.state;
        let newTask = {
            id: Date.now(),
            name: taskName,
            done: false
        };

        let newState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        });
        this.setState({cards: newState});
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                // When the server returns the definitive ID
                // used for the new Task on the server, update it on React
                newTask.id = responseData.id;
                this.setState({cards: newState});
            })
            .catch((error) => {
                this.setState(prevState);
            });
    }

    deleteTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex, 1]]}
            }
        });
        this.setState({cards: nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Server response wasn't OK");
                }
            })
            .catch((error) => {
                this.setState(prevState);
            });
    }

    toggleTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {$apply: (done) => !done}
                    }
                }
            }
        });
        this.setState({cards: nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done: nextState[cardIndex].tasks[taskIndex].done})
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Server response wasn't OK");
                }
            })
            .catch((error) => {
                this.setState(prevState);
            });


    }

    render() {
        return <KanbanBoard
            cards={this.state.cards}
            taskCallbacks={{
                toggle: this.toggleTask.bind(this),
                delete: this.deleteTask.bind(this),
                add: this.addTask.bind(this)
            }}
        />
    }


}