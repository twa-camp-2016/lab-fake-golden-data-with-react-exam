const  App=React.createClass({
    getInitialState:function () {
      return{
          isEditor:true,
          element:[]
      }
    },
    toggle:function () {
      this.setState({isEditor:!this.state.isEditor
      })
    },
   render:function () {
        const isEditor=this.state.isEditor;
       return <div>
           <button onClick={this.toggle}>{isEditor?'Preview':'Editor'}</button>
           <div></div>
           <div></div>
       </div>
   }
});

ReactDOM.render(<App />,document.getElementById('content'));