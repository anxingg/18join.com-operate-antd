import React, { PropTypes } from 'react'
import { Table, Pagination, } from 'antd';
import styles from './Todo.css';

function Todo({
  dispatch,
  list:dataSource,
  loading,
  pagination,
  onPageChange,
  onClaim,
  onDelete
}) {

  const columns = [
    {
      title: '标题',
      dataIndex: 'vars',
      key: 'vars.map.title',
      className: styles.avatar,
      render: (text) => <span>{text.map.title}</span>
    }, {
      title: '当前环节',
      dataIndex: 'taskName',
      key: 'taskName',
      render: (text,bpm) => <a target="_blank" href="/bpm/task/trace/photo/${bpm.procDefId}/${bpm.executionId}">{text}</a>
    }, {
      title: '流程名称',
      dataIndex: 'procDefName',
      key: 'procDefName',
      render: (text,bpm) => <b>{bpm.procDefName}-V{bpm.procDefVersion}</b>
    }, {
      title: '创建时间',
      dataIndex: 'taskCreateDate',
      key: 'taskCreateDate',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, bpm) => (
        <p>
          {bpm.assignee===''?<a onClick={() => onClaim(bpm.taskId)}>签收任务</a>:<a className="handle" target="_blank" href="/bpm/task/form?taskId={bpm.taskId}&taskName={bpm.taskName}&taskDefKey={bpm.taskDefKey}&procInsId={bpm.procInsId}&procDefId={bpm.procDefId}&status={bpm.status}">任务办理</a> }

          {bpm.executionId===''?<Popconfirm title='确定要删除吗？' onConfirm={() => onDelete(bpm.taskId)}>
            <a>删除</a>
          </Popconfirm>:null}

          <a target="_blank" href="/bpm/task/trace/photo/{bpm.procDefId}/{bpm.executionId}">跟踪</a>
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
        scroll={{ x: 800 }}
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

Todo.propTypes = {
  onPageChange: PropTypes.func,
  onDelete: PropTypes.func,
  onClaim: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  pagination: PropTypes.any
}

export default Todo;
