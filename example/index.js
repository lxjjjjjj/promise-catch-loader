
new Promise(resolve => {
  resolve(1)
}).then(res => {
  console.log(1, res)
})

new Promise(resolve => {
  resolve(3)
}).then(res => {
  console.log(3, res)
}).then(res => {
  console.log(4, res)
})

new Promise(resolve => {
  resolve(3)
}).then(res => {
  console.log(3, res)
}).catch(res => {
  console.log(4, res)
})

