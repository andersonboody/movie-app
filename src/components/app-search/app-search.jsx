import { Component } from 'react'
import './app-search.css'
import PropTypes from 'prop-types'
import { Input } from 'antd'

export default class AppSearch extends Component {
  static propTypes = {
    onChangeTitle: PropTypes.func,
    value: PropTypes.string,
  }

  render() {
    const { onChangeTitle, value } = this.props
    return <Input type="text" placeholder="Type to search..." onChange={onChangeTitle} value={value} />
  }
}
