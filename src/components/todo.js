import React, { Component } from 'react';
import './todo';
const container = {
  border:'1px solid #333',
  borderRadius :'20px',
  width:'80%',
  margin:'20px auto',
  padding:'5px',
  textAlign:'center',
  background : '#333'
}
const button = {
  background: '#001f4b',
  padding: '10px',
  border: '1px solid #832420',
  borderRadius: '2px',
  width: '100px',
  color: '#fff',
  fontSize: '18px'
}
const post = {
  fontFamily: 'Arial, Helvetica, serif',
  fontSize: '12px',
  overflowWrap: 'break-word'
}

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      text: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.markItemCompleted = this.markItemCompleted.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }
  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }
  handleAddItem(event) {
    event.preventDefault();

    var newItem = {
      id: Date.now(),
      text: this.state.text,
      done: false
    };

    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));
  }
  markItemCompleted(itemId) {
    var updatedItems = this.state.items.map(item => {
      if (itemId === item.id)
        item.done = !item.done;
      return item;
    });

    // State Updates are Merged
    this.setState({
      items: [].concat(updatedItems)
    });
  }
  handleDeleteItem(itemId) {
    var updatedItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });

    this.setState({
      items: [].concat(updatedItems)
    });
  }
  render() {
    return (
      <div style={container}>
        <h2>Todo List</h2>
        <div>
          <div>
            <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />
          </div>
        </div>
        <form>
          <div >
            <input type="text" onChange={this.handleTextChange} value={this.state.text} />
          </div>
          <div>
            <button
              style={button} onClick={this.handleAddItem} disabled={!this.state.text}>{"Add #" + (this.state.items.length + 1)}</button>
          </div>
        </form>
      </div>
    );
  }
}

class TodoList extends Component {
  render() {
    let itemLength = (this.props.items.length);
    return (
      <div style={{textAlign: 'left'}}>
        {this.props.items.map(item => (
          <TodoItem key={item.id} id={item.id} text={item.text} itemLength={itemLength} completed={item.done} onItemCompleted={this.props.onItemCompleted} onDeleteItem={this.props.onDeleteItem} />
        ))}
      </div>
    );
  }
}

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.markCompleted = this.markCompleted.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  markCompleted(event) {
    this.props.onItemCompleted(this.props.id);
  }
  deleteItem(event) {
    this.props.onDeleteItem(this.props.id);
  }
  componentDidMount() {
    if (this._listItem) {
      this._listItem.classList.add("highlight");

      setTimeout((listItem) => {
        listItem.classList.remove("highlight");
      }, 500, this._listItem);
    }
  }
  render() {
    var itemClass = "form-check todoitem " + (this.props.completed ? "done" : "undone");
    return (
      <div className={itemClass} ref={li => this._listItem = li}>
        <div >
          <label style={post}>
            <input type="checkbox" onChange={this.markCompleted} />   {this.props.text}
          </label>
          <button style={{float: 'right'}} type="button" onClick={this.deleteItem}>x</button>
        </div>
      </div>
    );
  }
}
