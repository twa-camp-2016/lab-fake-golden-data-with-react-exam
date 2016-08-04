const App = React.createClass({
    getInitialState: function () {
        return {
            isEditor: true,
            elements: []
        }
    },
    toggle: function () {
        this.setState({
            isEditor: !this.state.isEditor
        })
    },
    addElement: function (element) {
        const elements = this.state.elements;
        elements.push(element);
        this.setState(elements);
    },
    deleteElement: function (index) {
        const elements = this.state.elements;
        elements.splice(index);
        this.setState(elements);
    },
    render: function () {
        const isEditor = this.state.isEditor;
        return <div>
            <button onClick={this.toggle}>{isEditor ? "preview" : "Edit"}</button>
            <div className={isEditor ? "" : "hidden"}>
                <Editor elements={this.state.elements} onAdd={this.addElement} ondelete={this.deleteElement}/>
            </div>
            <div className={isEditor ? "hidden" : ""}>
                <Preview elements ={this.state.elements}/>
            </div>

        </div>
    }
});
const Editor = React.createClass({
    render: function () {
        return <div>
            <Left elements={this.props.elements} ondelete={this.props.ondelete}/>
            <Right onAdd={this.props.onAdd}/>
        </div>
    }
});


const Left = React.createClass({
    delete:function (index) {
      this.props.ondelete(index);
    },
    render: function () {
        const elements = this.props.elements.map((ele, index)=> {
            return <div key={index}>
                <input type={ele}/>
                <button onClick={this.delete.bind(this,index)}>-</button>
            </div>
        });
        return <div>
            {elements}
        </div>
    }
})
const Right = React.createClass({
    add: function () {
        const element =  $("input[name=element]:checked").val();
        this.props.onAdd(element);
    },
    render: function () {
        return <div>
            <input type="radio" name="element" value="text"/>text
            <input type="radio" name="element" value="date"/>date
            <button onClick={this.add}>+</button>
        </div>
    }
})
const Preview = React.createClass({
    render: function () {
        const elements = this.props.elements.map((ele, index)=> {
            return <div key={index}>
                <input type={ele}/>
            </div>
        });
        return <div>
            {elements}
            <button>submit</button>
        </div>
    }
});
ReactDOM.render(<App/>, document.getElementById('content'));