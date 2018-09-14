import React, { PropTypes } from 'react';

export const MetaItem = (props) => {
  const {label, value, render} = props
  return (
    <div className="row ml0 mr0 pt10 pb10 no-gutters align-items-center" style={{padding:'7px 0px'}}>
      <div className="col-2">
        <div className="fs13 color-black-2 font-weight-bold text-left pr25">{label}</div>
      </div>
      <div className="col text-left">
        <div className="fs13 color-black-1 text-wrap text-left"> {render ? render(value) : value}</div>
      </div>
    </div>
  )
}

export const MetaList = (props)=>(
  <ul className="">
    {props.children}
  </ul>
)

export default {
  MetaItem,
  MetaList,
}
