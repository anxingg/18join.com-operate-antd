import React , { PropTypes }from 'react';
import ReactDOM from 'react-dom';
import styles from './IFrame.css';
import ResizeCallbackMaker from './ResizeCallbackMaker'

class IFrame extends React.Component {
  state ={
    iframeCleanup: null,
    iframeOverflowY: null,
    iframeLocation: null
  }

  updateProgress =(progress)=>{
    if (this.props.progressCallback) {
      this.props.progressCallback(progress, 'none');
    }
  }
  callbackWrapper =(height, iframeOverflowY) =>{
    this.setState({ iframeOverflowY: iframeOverflowY });

    var sizeKnown = !!height;
    this.props.resizeCallback(height, sizeKnown);

  }

  handleOnLoad =()=>{
    this.updateProgress(100);

    if (this.props.resizeCallback) {
      if (this.state.iframeCleanup) {
        this.state.iframeCleanup();
      }
      var result = ResizeCallbackMaker.startResizingCallbacks(ReactDOM.findDOMNode(this.refs.iframe), this.callbackWrapper);

      if (result && result.cleanup) {
        this.setState({
          iframeCleanup: result.cleanup
        });
      } else {
        this.setState({
          iframeCleanup: null
        });
      }
    }
  }

  componentDidMount(){
    this.updateProgress(0);
  }
  componentWillUnmount(){
    if (this.state.iframeCleanup) {
      this.state.iframeCleanup();
    }
  }

  render () {
    let style = {
      overflowY: this.state.iframeOverflowY || '',
      height:600
    };
    return (
      <div
        className="resizing-iframe-container"
      >
        <iframe
          ref="iframe"
          id="mainFrame"
          onLoad={this.handleOnLoad}
          src={this.props.src}
          style={style}
          className="resizing-iframe"
        >
        </iframe>
      </div>
    );
  }

}
IFrame.propTypes={
  src: PropTypes.string,
  resizeCallback: PropTypes.func,
  progressCallback: PropTypes.func
}

export default IFrame;
