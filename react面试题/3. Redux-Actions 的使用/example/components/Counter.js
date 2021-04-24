import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions';

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onIncrement, onDecrement } = this.props
    return (
      <p>
        Clicked: {value} times
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
        {' '}
        <button onClick={onDecrement}>
          -
        </button>
      </p>
    )
  }
}

const mapStateToProps = state => {
  return {
    value: state,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrement: () => dispatch(increment()),
    onDecrement: () => dispatch(decrement()),
  }
}

// 3. 使用 connect 方法，将需要更新的组件连接进来，并传入 mapStateToProps 和 mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(Counter);