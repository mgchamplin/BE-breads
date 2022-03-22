const React = require('react')
const Default = require('./layouts/Default')

console.log(Default)

function Index () {
    return(
      <Default>
        <h2>Index Page</h2>
      </Default>
    )
}

module.exports = Index
