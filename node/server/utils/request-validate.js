/**
 * 请求参数验证工具
 * @param {Object} data      验证数据
 * @param {Object} ctx       上下文
 * @param {String} rules     规则 
 *   required： 必填字段
 *   number：   必须为数字
 *   array：    必须为数
 */

module.exports = (data, rules, ctx) => {
  Object.keys(rules).forEach(key => {
    let rule = rules[key].split('|');
    let d = data[key];

    rule.forEach(r => {
      let ruleKeyName = r.split(':');
      
      if(ruleKeyName[0] === 'required' && !d) {
        ctx.throw(400, `缺少${key}参数`);
      }
      if(ruleKeyName[0] === 'number' && typeof d !== 'number') {
        ctx.throw(400, `${key}必须是数字`);
      }
      if(ruleKeyName[0] === 'array' && !(d instanceof Array)) {
        ctx.throw(400, `${key}必须是数组`);
      }
    })
  })
}