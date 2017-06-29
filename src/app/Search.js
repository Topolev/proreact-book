import React, {Component} from "react";

export class Search extends React.Component{
    constructor(){
        super(...arguments);
        this.state = {
            searchTerm: "React"
        }
    }

    handleChange(event){
        this.setState({searchTerm: event.target.value})
    }

    render(){
        return (
          <div>
              Search Term: <input type="search"
                                  value={this.state.searchTerm}
                                  onChange={this.handleChange.bind(this)}/>
          </div>
        );
    }
}