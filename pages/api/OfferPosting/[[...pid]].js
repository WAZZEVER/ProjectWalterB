import { CreateTask } from '@/Firebase/TaskInit';

export const Page = async(req, res) => {
  const dest= req.query.pid[0]
  const dest2 = req.query.pid[1]
  const name = req.query.pid[2]
  const price = parseFloat(req.query.pid[3])
  const cooldown = parseInt(req.query.pid[4])
  // const link = req.query.pid[4];
  // let url;
  // switch (link) {
  //   case "shrinkme":
  //     url = `https://shrinkme.com/api?api=b46c551c8f63bb760d69ac67cb1ed1175cc586c6&url=${dest}`;
  //   case "shrinkearn":
  //     url = `https://shrinkearn.com/api?api=213fef8892c6f7d480e9cc3af072e5e1c999d485&url=${dest}`;
  // }
    const x = await CreateTask(cooldown, name, price, dest+ "/"+dest2)
    res.send(200)
}
