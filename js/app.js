const App = React.createClass({

    getInitialState:function () {
      return({
          isEditor:true
      })
    },

    toggle:function () {
      this.setState({
            isEditor:!this.state.isEditor,
        })
    },
    render:function(){
        const isEditor = this.state.isEditor;
        return <div>
            <button onClick={this.toggle}>{isEditor?"Preview":"Edit"}</button>
            <Editor />
            <Previewer/>

        </div>
    }
});

const Editor = React.createClass({
    render:function(){
        return <div>
            <Left/>
            <Right/>
        </div>
    }
});

const Previewer = React.createClass({
    render:function(){
        return <div>Previewer</div>
    }
});

const Left = React.createClass({
    render:function(){
        return <div>Left</div>
    }
});

const Right = React.createClass({
    render:function(){
        return <div>
            <input type="radio" name="element" value="text"/>Text
            <input type="radio" name="element" value="date"/>Date
            <button>+</button>
        </div>
    }
});

ReactDOM.render(<App />, document.getElementById('content'));