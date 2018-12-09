/**
 * 通过createContext 构造完成的context
 * 
 * context.request
 * context.response 
 * 
 * 
 * 这两个实际上就是koa对原生Node的res和req的扩展
 * 
 * 
 * 
 * context.res
 * context.req 
 * 
 * 保存的了Node原生的res 和 req对象
 */


/**
 *  通过代理的方式将request 和 response中的方法和属性挂载在context上
 *  属性的代理可以通过defineProperty实现
 * 
 *  方法的代理则需要注意this的绑定的问题
 */

