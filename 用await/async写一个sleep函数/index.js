//  await sleep(1000)


function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('sleep ' + time + ' over'), time)
  })
}

async function run(time) {
  let result = await sleep(time)
  console.log(result)
}

run(1000)