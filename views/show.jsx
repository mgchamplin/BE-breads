const React = require('react')
const Default = require('./layouts/Default')

function Show ({bread, index}) {
      return (
        <Default>
        <h3>{bread.name}</h3>
        <p>
          and it
          {
            bread.hasGluten
            ? <span> does </span>
            : <span> does NOT </span>
          }
          have gluten.
        </p>
        <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>

        <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
          <input type='submit' value="DELETE"/>
        </form>

        <img src={bread.image} alt={bread.name}/>
        <p>Baked by<b> {bread.baker}</b></p>
        <li><a href="/breads">Go home</a></li>
      </Default>
      )
  }

module.exports = Show