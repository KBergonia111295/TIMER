"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  NumberSpinner
  
  Component that maintains a number value in its state. 
  
  It will notifies the parent of plus/minus incremental changes to it.
*/

var NumberSpinner = function (_React$Component) {
  _inherits(NumberSpinner, _React$Component);

  function NumberSpinner(props) {
    _classCallCheck(this, NumberSpinner);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      numVal: _this.props.numVal
    };
    _this.handleDownClick = _this.handleDownClick.bind(_this);
    _this.handleUpClick = _this.handleUpClick.bind(_this);
    return _this;
  }

  NumberSpinner.prototype.propagateStateChange = function propagateStateChange(numVal) {
    var _this2 = this;

    if (this.state.numVal > 1 && this.state.numVal < 100) {
      this.setState({
        numVal: numVal
      }, function () {
        console.log("Updated NumVal: " + _this2.state.numVal);
        _this2.props.handleInputChange(_this2.state.numVal);
      });
    }
  };

  NumberSpinner.prototype.handleDownClick = function handleDownClick() {
    this.propagateStateChange(this.state.numVal - 1);
  };

  NumberSpinner.prototype.handleUpClick = function handleUpClick() {
    this.propagateStateChange(this.state.numVal + 1);
  };

  NumberSpinner.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "input-group number-spinner" },
      React.createElement(
        "span",
        { className: "input-group-btn" },
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.handleDownClick },
          React.createElement("span", { className: "glyphicon glyphicon-minus" })
        )
      ),
      React.createElement("input", { type: "text", className: "form-control text-center", value: this.state.numVal }),
      React.createElement(
        "span",
        { className: "input-group-btn" },
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.handleUpClick },
          React.createElement("i", { className: "glyphicon glyphicon-plus" })
        )
      )
    );
  };

  return NumberSpinner;
}(React.Component);

/**
  Timer component
  
  Maintains the following state properties:
    countdownTime: {Number}, the time in seconds for the timer to countdown to zero
    secondsLeft: {Number}, the number of seconds before a zero time is reached
    hasRun: {Boolean}, true if the start button has been pressed at least once
*/

var Timer = function (_React$Component2) {
  _inherits(Timer, _React$Component2);

  function Timer(props) {
    _classCallCheck(this, Timer);

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this3.state = {
      countDownTime: _this3.props.secondsLeft,
      secondsLeft: _this3.props.secondsLeft,
      hasRun: false
    };
    _this3.handleResetClick = _this3.handleResetClick.bind(_this3);
    _this3.handleStartClick = _this3.handleStartClick.bind(_this3);
    _this3.handleInputChange = _this3.handleInputChange.bind(_this3);
    return _this3;
  }

  Timer.prototype.handleInputChange = function handleInputChange(countDownTime) {
    console.log("App hasRun: " + this.state.hasRun);
    if (this.state.hasRun === false) {
      this.setState({ countDownTime: countDownTime, secondsLeft: countDownTime });
    } else {
      console.log("App handle input change: " + countDownTime);
      this.setState({ countDownTime: countDownTime });
    }
  };

  Timer.prototype.handleStartClick = function handleStartClick() {
    var _this4 = this;

    this.setState({
      secondsLeft: this.state.countDownTime
    });
    this.incrementer = setInterval(function () {
      _this4.setState({
        secondsLeft: _this4.state.secondsLeft - 1
      });
      if (_this4.state.secondsLeft === 0) {
        clearInterval(_this4.incrementer);
      }
    }, 1000);
    this.setState({
      incrementer: this.incrementer,
      hasRun: true
    });
  };

  Timer.prototype.handleResetClick = function handleResetClick(event) {
    var _this5 = this;

    this.setState({
      secondsLeft: this.state.countDownTime
    });
    clearInterval(this.incrementer);
    this.incrementer = setInterval(function () {
      _this5.setState({
        secondsLeft: _this5.state.secondsLeft - 1
      });
      if (_this5.state.secondsLeft === 0) {
        clearInterval(_this5.incrementer);
      }
    }, 1000);
    this.setState({
      incrementer: this.incrementer
    });
  };

  Timer.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "React.js Timer"
      ),
      React.createElement(NumberSpinner, { numVal: this.state.secondsLeft, handleInputChange: this.handleInputChange }),
      React.createElement(
        "h3",
        null,
        "Time Remaining (sec)"
      ),
      React.createElement(
        "div",
        { id: "time-remaining" },
        this.state.secondsLeft
      ),
      this.state.hasRun === false ? React.createElement(
        "button",
        { type: "button", onClick: this.handleStartClick },
        "Start"
      ) : React.createElement(
        "button",
        { type: "button", onClick: this.handleResetClick },
        "Reset"
      )
    );
  };

  return Timer;
}(React.Component);

ReactDOM.render(React.createElement(Timer, { secondsLeft: 10 }), document.querySelector("#app"));