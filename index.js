/**
 * 验证类
 * @summary 转换类
 * @namespace ininin-validator
 * @author woo@ininin.com
 * @version 1.1
 * @since 2016/2/22
 * @constructor
 */
module.exports = {
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
    validInteger(opts) {
        opts = opts || {}
        opts.field = opts.field == null ? '' : opts.field
        opts.required = opts.required == null ? false : opts.required
        opts.thanEqual = opts.thanEqual == null ? true : opts.thanEqual
        let msg = ''
        let val = Number(opts.value)
        let str = String(opts.value)
        let minimum = opts.minimum == null ? -999999999 : opts.minimum
        let maximum = opts.maximum == null ? 999999999 : opts.maximum
        if (opts.value === '') {
            msg = opts.required ? `请填写${opts.field}` : ''
        } else if (val < minimum && opts.thanEqual) {
            msg = `${opts.field}必须大于等于 ${minimum}`
        } else if (val <= minimum && !opts.thanEqual) {
            msg = `${opts.field}必须大于 ${minimum}`
        } else if (val > maximum && opts.thanEqual) {
            msg = `${opts.field}必须小于等于 ${maximum}`
        } else if (val >= maximum && !opts.thanEqual) {
            msg = `${opts.field}必须小于 ${maximum}`
        } else if (/^0\d+/.test(str)) {
            msg = `${opts.field}不能以 0 开头`
        } else if (/\.\d+$/.test(str)) {
            msg = `${opts.field}只能是整数`
        } else if (/^\d+$/.test(str)) {
            msg = ''
        } else {
            msg = `请填写正确的${opts.field}`
        }
        return msg
    },
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
    validDecimal(opts) {
        opts = opts || {}
        opts.field = opts.field == null ? '' : opts.field
        opts.decimals = opts.decimals == null ? 2 : opts.decimals
        opts.required = opts.required == null ? false : opts.required
        opts.thanEqual = opts.thanEqual == null ? true : opts.thanEqual
        let msg = ''
        let val = Number(opts.value)
        let str = String(opts.value).replace(/^-/, '')
        let regObj = {
            1: /^\d+(\.\d?)?$/,
            2: /^\d+(\.\d{0,2})?$/,
            3: /^\d+(\.\d{0,3})?$/,
            4: /^\d+(\.\d{0,4})?$/,
            5: /^\d+(\.\d{0,5})?$/,
            6: /^\d+(\.\d{0,6})?$/
        }
        let reg = regObj[opts.decimals] || regObj[2]
        let minimum = opts.minimum == null ? -999999999 : opts.minimum
        let maximum = opts.maximum == null ? 999999999 : opts.maximum
        if (opts.value === '') {
            msg = opts.required ? `请填写${opts.field}` : ''
        } else if (val < minimum && opts.thanEqual) {
            msg = `${opts.field}必须大于等于 ${minimum}`
        } else if (val <= minimum && !opts.thanEqual) {
            msg = `${opts.field}必须大于 ${minimum}`
        } else if (val > maximum && opts.thanEqual) {
            msg = `${opts.field}必须小于等于 ${maximum}`
        } else if (val >= maximum && !opts.thanEqual) {
            msg = `${opts.field}必须小于 ${maximum}`
        } else if (/^0\d+/.test(str)) {
            msg = `${opts.field}不能以 0 开头`
        } else {
            if (opts.decimals == 1 && /\.\d{2,}$/.test(str)) {
                msg = `${opts.field}仅支持一位小数`
            } else if (opts.decimals == 2 && /\.\d{3,}$/.test(str)) {
                msg = `${opts.field}仅支持两位小数`
            } else if (opts.decimals == 3 && /\.\d{4,}$/.test(str)) {
                msg = `${opts.field}仅支持三位小数`
            } else if (opts.decimals == 4 && /\.\d{5,}$/.test(str)) {
                msg = `${opts.field}仅支持四位小数`
            } else if (opts.decimals == 5 && /\.\d{6,}$/.test(str)) {
                msg = `${opts.field}仅支持五位小数`
            } else if (opts.decimals == 6 && /\.\d{7,}$/.test(str)) {
                msg = `${opts.field}仅支持六位小数`
            } else if (reg.test(str)) {
                msg = ''
            } else {
                msg = `请填写正确的${opts.field}`
            }
        }
        return msg
    },
    /**
     * 验证电话号码
     * @param {Object} opts 参数
     * @param {Number|String} opts.value 字段值
     * @param {String} [opts.field] 字段名
     * @param {Number} [opts.mode] 模式，默认0，0：手机和座机，1：手机，2：座机
     * @param {Boolean} [opts.required] 是否必填，默认false
     * @returns {String} 验证信息
     */
    validPhone(opts) {
        opts = opts || {}
        opts.field = opts.field == null ? '' : opts.field
        opts.mode = opts.mode == null ? 0 : opts.mode
        opts.required = opts.required == null ? false : opts.required
        let msg = ''
        let str = String(opts.value).replace(/^-/, '')
        const regMobile = /^1[3|4|5|6|7|8|9]\d{9}$/
        const regTel = /^0\d{2,3}-?\d{7,8}$/
        ///^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (opts.value === '') {
            msg = opts.required ? `请填写${opts.field}` : ''
        } else if (opts.mode == 1) { //手机号
            if (str.length < 11) {
                msg = `${opts.field}必须是 11 位数字`
            } else if (/^\d+$/.test(str)) {
                msg = `${opts.field}必须是 11 位数字`
            } else if (regMobile.test(str)) {
                msg = ''
            } else {
                msg = `${opts.field}格式有误`
            }
        } else if (opts.mode == 2) { //座机号
            if (str.length < 10) {
                msg = `${opts.field}必须是 10~13 位`
            } else if (regTel.test(str)) {
                msg = ''
            } else {
                msg = `${opts.field}格式有误`
            }
        } else {
            if (str.length < 10) {
                msg = `${opts.field}必须是 10~13 位`
            } else if (regMobile.test(str) || regTel.test(str)) {
                msg = ''
            } else {
                msg = `${opts.field}格式有误`
            }
        }
        return msg
    }
};