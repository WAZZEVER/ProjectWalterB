import { CreateTask } from '@/Firebase/TaskInit';
import fetch from 'node-fetch';

export default function Page(req, res) {
  const dest= req.query.pid[0]
  const name = req.query.pid[1]
  const price = parseFloat(req.query.pid[2])
  const cooldown = parseInt(req.query.pid[3])
  const url = `https://shrinkearn.com/api?api=213fef8892c6f7d480e9cc3af072e5e1c999d485&url=${req.query.pid[0]}`;
  fetch(url).then(resp => resp.json())
  .then( async (data) => {
    const x = await CreateTask(cooldown, name, price, data.shortenedUrl)
    res.send(200)
  })
}
