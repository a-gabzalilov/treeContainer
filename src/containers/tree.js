import React, { Component } from "react";

class Tree extends Component{
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            onClick: this.props.onClick,
        };
    }

    marginLeftScale = 25;

    createNode(data, level){
        let element = document.createElement('div');
        element.innerText = data.key;
        element.style.marginLeft = level * this.marginLeftScale + "px";
        element.onclick = (mouseEvent) => {this.state.onClick(mouseEvent.path[0].innerText)};
        let tree = document.getElementById('tree');
        tree.append(element);
    }

    displayTree(child, level){
        level++;
        for (let i = 0; i<child.length; i++){
            this.createNode(child[i], level);
            if (child[i].children.length !== 0)
            {
                this.displayTree(child[i].children, level);
            }
        }
    }

    componentDidMount() {
        this.displayTree(this.state.treeData, 0);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.treeData.length)
        if (this.state.treeData.length === 0){
            this.setState({treeData: this.props.treeData});
        }
        this.displayTree(this.state.treeData, 0);
    }

    render() {
        return(<div id='tree'/>)
    }
}

export default Tree;