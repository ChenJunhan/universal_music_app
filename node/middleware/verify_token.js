/** 
 * 验证token是否有效
 */

module.exports = (token) => {
  return async function(ctx, next) {
    let data = ctx.request.body;
    console.log(data);
    await next();
  }
}