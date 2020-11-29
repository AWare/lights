import Bree from 'bree'
const scheduler = new Bree({
  jobs: [
    {
      name: 'sleep',
      interval: 'at 10:05 am'
    },
    {
      name: 'wake',
      interval: 'at 10:15 am'
    }
  ]
})

scheduler.start()