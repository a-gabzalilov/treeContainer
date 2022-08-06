import React, { Component } from "react";
import "rc-tree/assets/index.css";
import Tree from "rc-tree";

class treeContainer extends Component{
    constructor(props) {
        super(props);
        this.state ={
            resultList: [],
        };
    }

    mass = {dfg: false}

    mas = [
        {
            id: '1',
        },
        {
            id: '2'
        },
        {
            id: '3',
            parent_id: '1'
        },
        {
            id: '4',
            parent_id: '2'
        },
        {
            id: '5',
            parent_id: '4'
        },
        {
            id: '6',
            parent_id: '1'
        },
        {
            id: '7',
            parent_id: '2'
        },
        {
            id: '8',
            parent_id: '2'
        },
    ]

    TreeNode = {
        id: '',
        children: []
    };

    isIterable(obj) {
        // checks for null and undefined
        if (obj == null) {
            return false;
        }
        return typeof obj[Symbol.iterator] === 'function';
    }

    makeTree() {
        const tree_map = new Map();

        if (!this.isIterable(this.mas))
            return;

        let result = [];
        for (let element of this.mas) {
            if (!element.id)
                return;
            let treeNode = {
                title: element.id,
                key: element.id,
                children: []
            };

            tree_map.set(element.id, treeNode);
        }
        for (let element of this.mas){
            if (element.parent_id){
                const parent = tree_map.get(element.parent_id)
                parent.children.push(tree_map.get(element.id))
            }
            else
            {
                result.push(tree_map.get(element.id));
            }
        }
        this.setState({resultList: result});
        console.log(this.state.resultList);
    }

    findChild(res, child, id){
        let i = 0;
        while (i < child.length){
            if (child[i].key === id){
                res = child[i].key.concat(res);
                return res;
            }
            if (child[i].children.length !== 0)
            {
                res = this.findChild(res, child[i].children, id);
            }
            if (res !== "")
            {
                res = child[i].key.concat(" "+res);
                return res;
            }
            i++;
        }
        return "";
    }

    getParents(id, e){
        let res = "";
        res = this.findChild(res, this.state.resultList, e.node.key);
        alert(res);
    }

    componentDidMount() {
        if (this.state.resultList.length === 0)
            this.makeTree()
    }

    render(){
        return(<div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
            <Tree treeData={this.state.resultList}
                  defaultExpandAll = {true}
                  showIcon={false}
                  onSelect={this.getParents.bind(this)}
            />
        </div>)
    }
}

export default treeContainer;