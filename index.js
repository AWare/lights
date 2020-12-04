import Bree from 'bree'
const scheduler = new Bree({
  jobs: [
    {
      name: 'sleep',
      interval: 'at 10:45 pm'
    },
    {
      name: 'wake',
      interval: 'at 7:50 am'
    }
  ]
})

scheduler.start()