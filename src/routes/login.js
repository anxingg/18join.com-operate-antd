import React, {PropTypes} from 'react'
import {Alert, Button, Row, Form, Input,Checkbox } from 'antd'
import { config } from '../utils'
import styles from './login.less'

const FormItem = Form.Item

const login = ({
  loginButtonLoading,
  errorMsg,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      onOk(values)
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <span>九盈保理</span>
      </div>
      <form>
        { errorMsg !=null ?  <Alert message={errorMsg} description=""  type="error"  showIcon /> : ''}
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请填写用户名'
              }
            ]
          })(<Input size='large' onPressEnter={handleOk} placeholder='用户名' />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请填写密码'
              }
            ]
          })(<Input size='large' type='password' onPressEnter={handleOk} placeholder='密码' />)}
        </FormItem>
        <FormItem>
        {getFieldDecorator('rememberMe', {
          valuePropName: 'checked',
            initialValue: true,
        })(
        <Checkbox>记住我</Checkbox>
      )}
        </FormItem>
        <Row>
          <Button type='primary' size='large' onClick={handleOk} loading={loginButtonLoading}>
            登录
          </Button>
        </Row>
      </form>
    </div>
  )
}

login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  errorMsg: PropTypes.string,
  onOk: PropTypes.func
}

export default Form.create()(login)
