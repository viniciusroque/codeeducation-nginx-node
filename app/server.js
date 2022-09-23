const express = require('express')
const app = express()
const PORT = 3000
const HOST = '0.0.0.0';

const peoplesService = require('./services/peoples')

app.get('/', (req, res) => {
  let ret =
    `<p>

      <p>&lt;h1&gt;Full Cycle Rocks!&lt;/h1&gt;</p>

    </p>`

  const peoples = peoplesService.createAndGetAll('Vinícius')
  peoples.then((data, error) => {
    if (data.length > 0){
      ret += `<p>`
      data.forEach(people => {
        ret += `<p> - ${people.name} </p>`
      });

      ret += `</p>`
      res.send(ret)
    } else{
      res.send(`<p> Nenhum nome cadastrado </p>`)
    }
  })

})

app.listen(PORT, HOST, async () => {
  await peoplesService.dropAndCreateTable('people')
  console.log('Running on port ' + PORT)
})