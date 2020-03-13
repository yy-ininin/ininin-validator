# ininin-validator

表单验证工具类，包含整数验证、小数验证、电话号码验证

# install

npm i ininin-validator

# github

https://github.com/yy-ininin/ininin-validator

# usage

```javascript
import validator from "ininin-validator";

/**
 * 验证整数
 * @param {Object} opts 参数
 * @param {Number|String} opts.value 字段值
 * @param {Number|String} opts.minimum 最小值，默认-999999999
 * @param {Number|String} opts.maximum 最大值，默认999999999
 * @param {String} [opts.field] 字段名
 * @param {Boolean} [opts.required] 是否必填，默认false
 * @param {Boolean} [opts.thanEqual] 是否为开区间（大于等于/小于等于），默认true
 * @returns {String} 验证信息
 */
const validMsg = validator.validInteger({
  value: 0,
  field: "年龄",
  minimum: 1
});
console.log(validMsg);
// 年龄必须大于等于 1

/**
 * 验证小数
 * @param {Object} opts 参数
 * @param {Number|String} opts.value 字段值
 * @param {Number|String} opts.minimum 最小值，默认-999999999
 * @param {Number|String} opts.maximum 最大值，默认999999999
 * @param {String} [opts.field] 字段名
 * @param {Number} [opts.decimals] 小数位，默认2
 * @param {Boolean} [opts.required] 是否必填，默认false
 * @param {Boolean} [opts.thanEqual] 是否为开区间（大于等于/小于等于），默认true
 * @returns {String} 验证信息
 */
const validMsg = validator.validDecimal({ value: 0.455, field: "金额" });
console.log(validMsg);
// 金额仅支持两位小数

/**
 * 验证电话号码
 * @param {Object} opts 参数
 * @param {Number|String} opts.value 字段值
 * @param {String} [opts.field] 字段名
 * @param {Number} [opts.mode] 模式，默认0，0：手机和座机，1：手机，2：座机
 * @param {Boolean} [opts.required] 是否必填，默认false
 * @returns {String} 验证信息
 */
const validMsg = validator.validPhone({ value: "1281234567", field: "手机号" });
console.log(validMsg);
// 手机号格式有误

/**
 * 去除空格
 * @param  {str}  str 字符串 必填
 * @param  {type}  type:  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return {String} 字符串
 */
let str1 = " A A "
validator.trim(str1, 1)
// "AA"

validator.trim(str1, 2)
// "A A"

validator.trim(str1, 3)
// "A A "

validator.trim(str1, 4)
// " A A"

