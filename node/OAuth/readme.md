# OAuth2.0

### 什么是OAuth

  An open protocol to allow secure API authorization in a simple and standard method from desktop and web application

  OAuth包含三种角色：

  - Consumer: 消费者
  - Service Provider: 服务提供商
  - User: 用户

  当消费者想要从服务提供商获取OAuth授权，必须去申请 ID 和 Secret。

### 一般授权的流程

  以GitHub为例：

  - 首先GitHub会将用户权限分类，这时需要我们在GitHub平台上注册应用，注明自己需要的权限，填写上自己的域名，GitHub只允许在这个域名下获取用户的权限，应用审核通过后，我们可以获取到GitHub提供的 Client ID 和 Client Secret
  - 当用户在我们的网站中点击GitHub时，我们将 Client ID交给用户，让他进入到GitHub授权页面，GitHub通过 Client ID, 判断是我们让用户过来的，这时GitHub询问用户是否提供这些权限
  - 如果用户拒绝，那么授权到此结束。
  - 如果用户允许，那么 GitHub 将会在回调链接上附带上code。
  - 但是拿到code 并不能直接去获取GitHub的相关信息，因为任何人都可以使用该code，这时再还需要再结合 Client Secret 向GitHub获取到最后的 access_token

### OAuth vs OpenID

  - OpenID: 只用于用户身份认证（authentication），仅仅是个合法身份的背书。
  - OAuth: 用于授权（Authorization）,允许被授权方访问授权方的用户数据。