const setupAddListener = (req, res) => {
  //res.userid = req.user.id
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })

  console.log('setup sse')
  // const pingInterval = setInterval(() => {
  //   res.write('event: ping\n');
  //   res.write('data: {}\n\n');
  // }, 5000)

  req.on('close', () => {
    //clearInterval(pingInterval);
  })

  const eventEmitter = req.app.get('eventEmitter')
  eventEmitter.on('alert', data => {
    res.write(`event: alert\n`)
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  })
}

module.exports = { setupAddListener }
