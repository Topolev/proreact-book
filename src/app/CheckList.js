import React, {Component} from "react";


export class CheckList extends Component {
    render(){
        let tasks = this.props.tasks.map(task => (
            <li className="checklist__task">
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}
                <a href="#" className="checklist__task--delete" />
            </li>
        ));
        return (
            <ul className="checklist">
                {tasks}
            </ul>
        );
    }
}