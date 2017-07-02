import React, {Component, PropTypes} from "react";


export default class CheckList extends Component {

    addNewTask(ev){
    if (ev.key ==='Enter'){
        this.props.taskCallbacks.add(this.props.cardId, ev.target.value);
        ev.target.value = "";
    }
    }
    render() {
        let tasks = this.props.tasks.map((task,taskIndex) => (
            <li className="checklist__task" key={task.id}>
                <input type="checkbox"
                       checked={task.done}
                onChange={this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)}/>
                {task.name}
                <a href="#" className="checklist__task--delete"
                onClick={this.props.taskCallbacks.delete.bind(null,this.props.cardId, task.id, taskIndex)}/>
            </li>
        ));
        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                       className="checklist--add-task"
                       placeholder="Type the hit Enter to add a task"
                onKeyPress={this.addNewTask.bind(this)}/>
            </div>

        );
    }
}




CheckList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object)
}