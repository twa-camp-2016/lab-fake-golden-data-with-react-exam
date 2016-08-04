const App = React.createClass({
    getInitialState: function () {
            return {
               isEditor:true,
                elements:[]
            }
        },
    toggle:function () {
        this.setState({isEditor:!this.state.isEditor});
    },
    addElement:function (element) {
        const elements  =this.state.elements;
        elements.push(element);
        this.setState({elements});
    },
    deleteElement:function (index) {
        const elements  =this.state.elements;
        elements.splice(index);
        this.setState({elements});
    },
    render: function () {
        const elements = this.state.elements;
            const isEditor = this.state.isEditor;
        return <div ><button onClick={this.toggle}>{isEditor?"Preview":"Edit"}</button>
            <div className={isEditor?"":"hidden"}>
                <Editor onAdd={this.addElement} elements = {elements} onDelete={this.deleteElement}/>
            </div>
            <div className={isEditor?"hidden":""}>
                <Preview />
            </div>
        </div>
    }
});

const Editor = React.createClass({
    render: function () {
        return <div>
            <Left elements = {this.props.elements} onDelete={this.props.onDelete}/>
            <Right onAdd = {this.props.onAdd} />
        </div>
    }
});

const Preview = React.createClass({
render:function(){
return<div> Preview</div>
}
});

const Left = React.createClass({
    remove:function (index) {
      this.props.onDelete(index);
    },
render:function(){
    const elements = this.props.elements.map((ele,index)=>{
        return <div><input type={ele}/>
        <button onClick={this.remove.bind(this,index)}>X</button></div>
    })
return<div> {elements}</div>
}
});

const Right = React.createClass({
    add:function () {
      const element = $('input[name=element]:checked').val();
        this.props.onAdd(element);
    },
render:function(){
return<div>
    <input type="radio" name="element" value="text"/>Text
    <input type="radio" name="element" value="date"/>Date
    <button onClick={this.add}>+</button>
</div>
}
})
ReactDOM.render(<App />, document.getElementById('content'));