'use strict'

let seneca = require('seneca')()
seneca.use('./redis-queue-transport', {
    'redis-queue': {
      timeout: 22222,
      type: 'redis-queue',
      host: '192.168.99.100',
      port: 6379
    }
  })
  
  .ready(function () {
  this.add({role: 'search', cmd: 'get_reply'}, function (args, done) {
	  
	 console.log(args.payload)
    done(null, {bar: 'REPLY FROM SERVER ' + args.payload})
  })
})

seneca.listen({type: 'redis-queue', pin: 'foo:one'})
