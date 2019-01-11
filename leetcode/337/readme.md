# JavaScript刷LeetCode -- 337. House Robber III [Medium]

#### 一、题目

  &emsp;&emsp;The thief has found himself a new place for his thievery again. There is only one entrance to this area, called the "root." Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that "all houses in this place forms a binary tree". It will automatically contact the police if two directly-linked houses were broken into on the same night.

  &emsp;&emsp;Determine the maximum amount of money the thief can rob tonight without alerting the police.

#### 二、题目大意

  &emsp;&emsp;小偷从根节点进入，不能偷窃两个两个直接相邻的节点，求出可以盗窃的最大金额。

#### 三、解题思路

  &emsp;&emsp;理解题目的意思之后，采用递归的方式很容易求解。

#### 四、代码实现

```JavaScript
const rob = root => {
  if (!root) {
    return 0
  }
  const val = root.val

  const ll = root.left ? rob(root.left.left) : 0
  const lr = root.left ? rob(root.left.right) : 0
  const rl = root.right ? rob(root.right.left) : 0
  const rr = root.right ? rob(root.right.right) : 0
  
  return Math.max(val + ll + lr + rl + rr, rob(root.left) + rob(root.right))
}
```