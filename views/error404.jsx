const React = require('react')
const Default = require('./layouts/Default')

function Error404 () {
      return (
        <Default>
        <h3>Bread Not Found</h3>
        <h4><a href="/breads">Click To Return To Breads</a></h4>
        </Default>
      )
  }

module.exports = Error404