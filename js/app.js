const App = React.createClass({
    getInitialState:function(){
        return {
            isEditor:true,
            elements:[]
        }
    },
    toogle:function () {
        this.setState({isEditor:!this.state.isEditor});
    },
    add:function (element) {
        const elements = this.state.elements;
        elements.push(element);
        
        this.setState({elements});
        console.log(elements);

    },
    onRemove:function (i) {
        const elements = this.state.elements;
        elements.splice(i,1);

        this.setState({elements});
    },
    render: function (isEditor) {
        isEditor = isEditor || this.state.isEditor;
        return (
            <div>
                <button onClick={this.toogle}>{isEditor? 'preview':'edit'}</button>
                <div className={isEditor?'':'hidden'} >
                    <Editor onAdd={this.add} onRemove={this.onRemove} elements={this.state.elements}/>
                </div>
                <div className={isEditor?'hidden':''}>
                    <Preciew elements={this.state.elements}/>
                </div>
            </div>
        )
    }   
});

const Editor = React.createClass({

    render: function(){
        return (
            <div>
                <div>
                    <Left onRemove={this.props.onRemove} elements={this.props.elements}/>
                </div>
                <div>
                    <Right onAdd={this.props.onAdd}/>
                </div>
            </div>
        )
    }
});

const Left = React.createClass({

    remove:function (i) {
        this.props.onRemove(i)
    },
   
    render: function(){
        const elements = this.props.elements.map((ele,i)=> {
            return <div key={i}>
                <input type={ele}/>
                <button onClick={this.remove.bind(this,i)}>x</button>
            </div>
        })
        return (
            <div>{elements}</div>
        )
    }   
});

const Right = React.createClass({
   
    add:function () {
        const element = $("input[name='element']:checked").val();
        this.props.onAdd(element)
    },
    render: function(){
        return (
            <div>
                <input type="radio" name="element" value="text"/>text
                <input type="radio" name="element" value="date"/>date
                <button onClick={this.add}>+</button>
            </div>
        )
    }   
});

const Preciew = React.createClass({

    render: function(){
        const elements = this.props.elements.map((ele,i)=> {
            return <div key={i}>
                <input type={ele}/>
            </div>
        })
        return (
            <div>{elements}</div>
        )
    }
});

ReactDOM.render(<App/>,document.getElementById('content'))