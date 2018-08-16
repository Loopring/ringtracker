import React, { PropTypes } from 'react';

export const MetaItem = (props) => {
  const {label, value, render} = props
  return (
    <div className="row ml0 mr0 pt10 pb10 zb-b-b no-gutters align-items-center" style={{padding:'7px 0px'}}>
      <div className="col">
        <div className="fs14 color-black-1 text-left font-weight-bold">{label}</div>
      </div>
      <div className="col-auto text-right">
        <div className="fs14 color-black-1 text-wrap text-left"> {render ? render(value) : value}</div>
      </div>
    </div>
  )
}

export const MetaList = (props)=>(
  <ul className="list list-label list-dark list-justify-space-between divided">
    {props.children}
  </ul>
)

export default {
  MetaItem,
  MetaList,
}
