/**
 * Created by yatessss on 16/12/15.
 */
import React from 'react'
import { getContentData, getNextNews } from '../redux/action'
import { connect } from 'react-redux';
import '../css/list-default.scss'
import api from '../api'
import ListItem from '../components/list-item.jsx'
import filter from '../util/filter'
import Slider from './slider.jsx'

const listDefault = React.createClass({
  componentDidMount () {
    let { dispatch } = this.props
    dispatch(getContentData(api.LATEST_NEWS))
    window.addEventListener('scroll', this.getScrollList, false)
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', this.getScrollList, false)
  },
  getScrollList () {
    let { dispatch } = this.props
    if ((window.document.body.offsetHeight + window.document.body.scrollTop) + 100 > window.document.body.scrollHeight && !this.props.loading) {
      dispatch(getNextNews(api.NEXT_NEWS + this.props.date))
    }
  },
  render() {
    let { dispatch, all_stories} = this.props
    return (

        <div className="main-list">
          {/*// <!--轮播组件-->*/}
          <Slider></Slider>
          {/*// <!--列表-->*/}
            {all_stories.map((item, index) =>
              <div className="list-box" key={index}>
                <ul key={item.date}>
                  <h2 className="title">{filter.dateTime(item.date)}</h2>
                  {item.stories.map(subItem=>
                    <ListItem key={subItem.id} item={subItem}></ListItem>
                  )}
                  {/*<list-comp v-for="subItem in item.stories" item="subItem"></list-comp>*/}
                </ul>
              </div>
            )}
        </div>
    )
  }
});

const mapStateToProps = (state, ownProps) => ({
  all_stories: state.content_list.all_stories,
  date: state.content_list.date,
  top_stories: state.content_list.top_stories,
  loading: state.content_list.loading,
})

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(listDefault)
