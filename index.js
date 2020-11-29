import Bree from 'bree'
const scheduler = new Bree({
  jobs: [
    {
      name: 'sleep',
      interval: 'at 11pm'
    },
    {
      name: 'wake',
      interval: 'at 7 am'
    }
  ]
})

scheduler.start()