const App = React.createClass({
    getInitialState: function () {
        return ({
            isEditor: true,
            elements: []
        })
    },
    toggle: function () {
        this.setState({isEditor: !this.state.isEditor});
    },
    render: function () {
        const isEditor = this.state.isEditor;
        return (<div>
            <button onClick={this.toggle}>prevew</button>
            <div className={isEditor ? '' : 'hidden'}>
                <Editor />
            </div>
            <div className={isEditor ? 'hidden' : ''}>
                <Previewer />
            </div>
        </div>)
    }
});
const Editor = React.createClass({
    render: function () {
        return (
            <div>
                <Left/>
                <Right/>
            </div>
        );
    }
});
const Left = React.createClass({
    render:function () {
        return (<div>left</div>);
    }
});
const Right = React.createClass({
    render:function () {
        return (<div>right</div>);
    }
});
const Previewer = React.createClass({
    render: function () {
        return (
            <div>previewer</div>
        );
    }
});

ReactDOM.render(<App/>, document.getElementById('content'));
