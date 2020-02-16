import React, { Component } from 'react'
import './App.css'
import BarChart from './BarChart/BarChart'
class App extends Component {
  render() {
    return (
      <div className='App'>
        <div>
          <BarChart />
        </div>
      </div>
    )
  }
}
export default App