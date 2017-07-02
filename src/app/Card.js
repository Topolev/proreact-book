import React, {Component, PropTypes} from "react";
import CheckList from "./CheckList";
import marked from 'marked';
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import {DragSource, DropTarget} from "react-dnd";
import constants from "./constant";

const cardDragSpec = {
    beginDrag(props){
        console.log("beginDrag", props);
        return {
            id: props.id
        }
    }
    // TODO add endDrag to save the changed order of cards after dropping
};

const cardDropSpec = {
    hover(props, monitor){
        const draggedId = monitor.getItem().id;
        console.log("underCard",props.id);
        props.cardCallbacks.updatePosition(draggedId, props.id);
    }
};

let collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
    }
};
let collectDrop = (connect, monitor) =>{
    return{
        connectDropTarget: connect.dropTarget()
    }
}

class Card extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showDetails: false
        }
    }

    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }

    render() {
        let {connectDropTarget, connectDragSource} = this.props;
        let cardDetail;
        if (this.state.showDetails) {
            cardDetail = (
                <div className="card__details">
                    <span dangerouslySetInnerHTML={{__html: marked(this.props.description)}}/>
                    <CheckList
                        cardId={this.props.id}
                        tasks={this.props.tasks}
                        taskCallbacks={this.props.taskCallbacks}
                        cardCallbacks={this.props.cardCallbacks}/>
                </div>
            );
        }

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        };

        return connectDropTarget(connectDragSource(
            <div className="card">
                <div style={sideColor}/>
                <div className={
                    this.state.showDetails ? "card__title card__title--is-open" : "card__title"
                }
                     onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
                <ReactCSSTransitionGroup transitionName="toggle"
                                         transitionEnterTimeout={250}
                                         transitionLeaveTimeout={250}>
                    {cardDetail}
                </ReactCSSTransitionGroup>
            </div>
        ));
    }

}


let titlePropType = (props, propName, componentName) => {
    if (props[propName]) {
        let value = props[propName];
        if (typeof value !== 'string' || value.length > 80) {
            return new Error(
                `${propName} in ${componentName} is longer than 80 symbols`
            )
        }
    }
};

Card.propTypes = {
    id: PropTypes.number,
    description: PropTypes.string,
    title: titlePropType,
    color: PropTypes.string,
    tsks: PropTypes.arrayOf(PropTypes.objwect)
};

const dragHighOrderCard =  DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dropHighOrderCard;