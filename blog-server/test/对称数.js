let arr = []

for (let i = 10; i <= 10000; i++) {
  if (Number(i.toString().split('').reverse().join('')) === i) {
    arr.push(i)
  }
}
console.log(arr)

