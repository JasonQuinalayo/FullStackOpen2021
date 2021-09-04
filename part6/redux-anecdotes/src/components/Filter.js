import React from 'react'
import { filter as filterActionCreator } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({ filter }) => {

  const handleChange = (event) => {
    filter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
    filter: filterActionCreator
  }
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
