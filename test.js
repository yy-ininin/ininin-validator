const validator = require('./index')

const validMsg = validator.validInteger({value: 0, field: '年龄', minimum: 1})
console.log(validMsg)

const validMsg2 = validator.validDecimal({value: 0.455, field: '金额'})
console.log(validMsg2)

const validMsg3 = validator.validPhone({value: '1281234567', field: '手机号'})
console.log(validMsg3)