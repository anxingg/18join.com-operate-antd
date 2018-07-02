import React, { PropTypes } from 'react'
import { Table, Pagination, } from 'antd';
import styles from './Done.css';

function Done({
  dispatch,
  list:dataSource,
  loading,
  pagination,
  onPageChange,
}) {


  const columns = [
    {
      title: '标题',
      dataIndex: 'vars',
      key: 'vars.map.title',
      className: styles.avatar,
      render: (text,bpm) => <a target="_blank" href={`/bpm/task/form?taskId=${bpm.taskId}&taskName=${bpm.taskName}&taskDefKey=${bpm.taskDefKey}&procInsId=${bpm.procInsId}&procDefId=${bpm.procDefId}&status=${bpm.status}`}>{bpm.vars.map.title}</a>
    }, {
      title: '历史环节',
      dataIndex: 'name',
      key: 'name',
      render: (text,bpm) => <a target="_blank" title="点击查看当前环节" href={`/bpm/rest/diagram-viewer?processDefinitionId=${bpm.procDefId}&processInstanceId=${bpm.procInsId}`}>{bpm.taskName}</a>
    }, {
      title: '流程名称',
      dataIndex: 'procDefName',
      key: 'procDefName',
      render: (text,bpm) => <b>{bpm.procDefName}-V{bpm.procDefVersion}</b>
    }, {
      title: '完成时间',
      dataIndex: 'taskEndDate',
      key: 'taskEndDate',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, bpm) => (
        <p>
          <a target="_blank" href={`/bpm/task/form?taskId=${bpm.taskId}&taskName=${bpm.taskName}&taskDefKey=${bpm.taskDefKey}&procInsId=${bpm.procInsId}&procDefId=${bpm.procDefId}&status=${bpm.status}`}>详情</a>
        </p>
      )
    }
  ]

  return (
    <div>
      <Table
        className={styles.table}
        size="middle"
        bordered={false}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record.taskId}
      />
    </div>
  )
}

Done.propTypes = {
  onPageChange: PropTypes.func,
  onDelete: PropTypes.func,
  onClaim: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  pagination: PropTypes.any
}

export default Done;
