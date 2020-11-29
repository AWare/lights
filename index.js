import Bree from 'bree'
const scheduler = new Bree({
  jobs: [
    {
      name: 'sleep',
      interval: 'at 11:12 pm'
    },
    {
      name: 'wake',
      interval: 'at 7:00 am'
    }
  ]
})

scheduler.start()