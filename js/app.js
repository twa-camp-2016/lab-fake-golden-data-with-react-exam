const App = React.createClass({
    getInitialState: function () {
        return {
            elements: []
        }
    },

    addElement: function (element) {
        const elements = this.state.elements;
        elements.push(element);
        this.setState({elements});
    },
    deleteElement: function (index) {
        let elements = this.state.elements;
        elements.splice(index, 1);
        this.setState({elements});
    },

    render: function () {

        return  <div>
            {
                this.props.children && React.cloneElement(this.props.children,{
                    onAdd:this.addElement,
                    onDelete:this.deleteElement,
                    elements:this.state.elements
                })
            }
        </div>
    }
});

const Editor = React.createClass({

    render: function () {
        return <div>
            <ReactRouter.Link to="/Previewer">
                <button>Preview</button>
            </ReactRouter.Link>

            <div className="left">
                <Left elements={this.props.elements} onDelete={this.props.onDelete}/>
            </div>

            <div>
                <Right onAdd={this.props.onAdd}/>
            </div>
        </div>
    }
});

const Left = React.createClass({
    remove: function (index) {
        this.props.onDelete(index)
    },
    render: function () {
        const elements = this.props.elements.map((ele)=> {
            return <div>
                <div className="editorItem">
                    <div className="input-group">
                        <input type={ele} className="form-control"/>
                        <span className="input-group-btn">
            <button className="btn btn-danger" onClick={this.remove.bind(this.index)}>-</button>
            </span>
                    </div>
                </div>

            </div>
        })

        return <div className="col-sm-4 col-sm-offset-2">
            {elements}
        </div>
    }
});

const Right = React.createClass({
    add: function () {
        let element = $("input[name=element]:checked").val();
        element = element === undefined ? "" : this.props.onAdd(element);

    },
    render: function () {
        return <div className="row right">
            <div className="col-sm-2 col-lg-offset-2">
                <input type="radio" name="element" className="item" value="text"/>Text
                <input type="radio" name="element" className=" item" value="date"/>date
                <div>
                    <button onClick={this.add} className="item btn btn-success">+</button>
                </div>
            </div>
        </div>
    }

})

const Previewer = React.createClass({

    render: function () {
        const elements = this.props.elements.map((ele, index) => {
            return <div key={index} className="PreviewItem col-sm-5 col-sm-offset-4">
                <input type={ele} className="form-control"/>
            </div>
        });
        return <div>
            <ReactRouter.Link to="/">
                <button>Edit</button>
            </ReactRouter.Link>
            <div className="editor">
                {elements}
            </div>
            <button className="btn btn-warning col-sm-1 col-sm-offset-6">submit</button>
        </div>
    }

})

ReactDOM.render(
    <ReactRouter.Router>
        <ReactRouter.Route path="/" component={App}>
         <ReactRouter.IndexRoute component={Editor}/>
         <ReactRouter.Route path="previewer" component={Previewer}/>
        </ReactRouter.Route>
    </ReactRouter.Router>
    , document.getElementById("content"));