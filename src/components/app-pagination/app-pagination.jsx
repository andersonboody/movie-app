import { Component } from 'react'
import './app-pagination.css'
import PropTypes from 'prop-types'
import { Pagination } from 'antd'

export default class AppPagination extends Component {
  static propTypes = {
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func,
    total: PropTypes.number,
  }

  render() {
    const { currentPage, onPageChange, total } = this.props
    return (
      <Pagination
        className="pagination"
        align="center"
        current={currentPage}
        onChange={onPageChange}
        showSizeChanger={false}
        total={total}
        pageSize={1}
      />
    )
  }
}
