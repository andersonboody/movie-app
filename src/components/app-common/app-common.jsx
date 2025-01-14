import { Alert, Flex, Spin } from 'antd'
import './app-common.css'
import PropTypes from 'prop-types'

const AppError = ({ messageError }) => {
  return <Alert message={messageError} type="warning" closable />
}
const AppNoFilms = () => {
  const message = 'Не смогли найти указанный фильм'
  return <Alert message={message} type="success" closable />
}
const AppSpin = () => {
  const message = 'Подождите, данные сейчас загрузятся'
  return (
    <Flex gap="middle" vertical>
      <Spin tip="Loading...">
        <Alert className="loading" message={message} type="info" banner />
      </Spin>
    </Flex>
  )
}
const NoInternetConnect = () => {
  const message = 'Oтсутствует подключение интернета, проверьте подключение!'
  return <Alert className="error-internet" message={message} type="info" />
}

AppError.propTypes = {
  messageError: PropTypes.string,
}

export { AppError, AppSpin, AppNoFilms, NoInternetConnect }
