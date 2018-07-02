import React , { PropTypes } from 'react'
import { connect } from 'dva'
import IFrame  from '../components/IFrame/IFrame'
import '../components/IFrame/IFrame.css'

function MainPage ({ location, dispatch ,currentMenu}){
  const menuProps = {
    src: 'http://bl.18join.com'+currentMenu.href,
    resizeCallback(size, sizeKnown){
      console.log(size);
    }
  }

  return (
      <IFrame {...menuProps} />
  )
}

MainPage.propTypes = {
  currentMenu: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps ({ app }) {
  return {currentMenu: app.currentMenu }
}

export default connect(mapStateToProps)(MainPage)

