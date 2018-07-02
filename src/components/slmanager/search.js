import React, { PropTypes } from 'react'
import {  Row, Col } from 'antd'
import SearchTableForm from '../slmanager/searchTable'
import styles from './slmanager.less'

const search = ({
  listnamemap,
  queryplatformUname,
  autoInputName,
  querytbsltask
}) => {
  const searchGroupProps = {
    listnamemap,
    queryplatformUname,
    autoInputName,
    querytbsltask
  }
  return (
    <Row gutter={24} >
      <Col lg={24} md={24} sm={24} xs={24} className={styles.SearchTableForm}>
        <SearchTableForm {...searchGroupProps} />
      </Col>
    </Row>
  )
}

search.propTypes = {
  listnamemap: PropTypes.array,
}

// export default Form.create()(search)
export default search
