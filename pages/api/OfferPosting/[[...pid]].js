import { CreateTask } from '@/Firebase/TaskInit';
import fetch from 'node-fetch';

export default function Page(req, res) {
  const dest= req.query.pid[0]
  const name = req.query.pid[1]
  const price = parseFloat(req.query.pid[2])
  const cooldown = parseInt(req.query.pid[3])
  const url = `https://shrinkearn.com/api?api=${process.env.SHRINKEARN}&url=${req.query.pid[0]}`;
  fetch(url).then(resp => resp.json())
  .then( async (data) => {
    const x = await CreateTask(cooldown, name, price, data.shortenedUrl)
    console.log(x)
    res.send(200)
  })
}
