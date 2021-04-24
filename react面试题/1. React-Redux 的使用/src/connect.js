import React from 'react'
import PropTypes from 'prop-types'

// 高阶组件
const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
  
    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {} // 声明了一个叫做 props 的 state
      }
    }
  
    componentDidMount() {
      const { store } = this.context  // 从 Context 中拿到 store 对象
      store.subscribe(() => this.update()) // 订阅
      this.update()
    }
  
    // 每次数据有更新的时候，就会调用这个方法
    update() {
      const { store } = this.context // 从 Context 中拿到 store 对象
      const stateProps = mapStateToProps(store.getState()) // 把 store 中的全部数据传到组件内部
      const dispatchProps = mapDispatchToProps(store.dispatch) // 把 store.dispatch 传到组件内部
      
      // 调用 setState 触发组件更新
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }
  
    render() {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}

export default connect;

// const mapStateToProps = state => {
//   return {
//     value: state,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onIncrement: () => dispatch({ type: 'INCREMENT' }),
//     onDecrement: () => dispatch({ type: 'DECREMENT' }),
//   }
// }