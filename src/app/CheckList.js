import React, {Component, PropTypes} from "react";


export class CheckList extends Component {
    render() {
        let tasks = this.props.tasks.map(task => (
            <li className="checklist__task" key={task.id}>
                <input type="checkbox" defaultChecked={task.done}/>
                {task.name}
                <a href="#" className="checklist__task--delete"/>
            </li>
        ));
        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                       className="checklist--add-task"
                       placeholder="Type the hit Enter to add a task"/>
            </div>

        );
    }
}




CheckList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object)
}