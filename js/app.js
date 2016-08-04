// 22:45
const App = React.createClass({
    getInitialState: function () {
        return ({isEditor: true,
        elements:[]});
    },
    toggle: function () {
        this.setState({isEditor: !this.state.isEditor});
    },
    addElement: function (element) {
        const elements = this.state.elements;
        elements.push(element);
        this.setState({elements});
    },
    render: function () {
        const isEditor = this.state.isEditor;
        return <div>
            <button onClick={this.toggle}>{isEditor ? 'Preview' : 'Editor'}</button>
            <Editor className={isEditor ? '' : 'hidden'} elements = {this.state.elements} onAdd={this.addElement}/>
            <Preview className={isEditor ? 'hidden' : ''}/>
        </div>;
    }
});

const Editor = React.createClass({
    render: function () {
        return (
            <div className={this.props.className}>
                <Left elements = {this.props.elements}/>
                <Right onAdd={this.props.onAdd}/>
            </div>
        )
    }
});
const Left = React.createClass({
    render: function () {
        const elements = this.props.elements.map((element, index)=> {
            return <div key = {index}>
                <input type={element}/>
                <input type='button' value='-'/>
            </div>
        });
        return (
            <div className={this.props.className}>
                {elements}
            </div>
        )
    }
});
const Right = React.createClass({
    add: function () {
        const element = $('input[name = element]:checked').val();
        this.props.onAdd(element);
    },
    render: function () {
        return (
            <div className={this.props.className}>
                <input type="radio" name='element' value='text'/>Text
                <input type="radio" name='element' value='date'/>Date
                <input onClick={this.add} type="button" value='+'/>
            </div>
        )
    }
});

const Preview = React.createClass({
    render: function () {
        return (
            <div className={this.props.className}>preview</div>
        )
    }
});

ReactDOM.render(<App/>, document.getElementById('content'));
