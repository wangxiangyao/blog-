---
title: angularJS框架下的select标签
date: 2017-01-09 21:01:59
tags:
	- angularJS
	- javascript框架
categories:
	- angularJS
---

## 描述
- 用angularJS实现表单的各种功能。

看起来很简单，其实有一些**坑**在里边，比如。
### 问题
1. 如何生成option 
2. 怎样取到用户选择的option对应的值
3. 如何设置默认option

一个一个分析

<!-- more -->

## 具体分析
先上代码
```html
<body ng-app="cal">
	<div ng-controller="cal-controllar">
		<input type="text" ng-model="num1" ng-change="jisuan()">
		<select ng-model="fuhao" ng-options="i.operator as i.operator for i in operator" ng-change="jisuan()">
			<option value="" ng-selected="true" class="init">-- 选运算符 --</option>
		</select>
		<input type="text" ng-model="num2" ng-change="jisuan()">
		=
		<span ng-bind="res"></span>
	</div>
	<script src="bower_components/angular/angular.min.js"></script>
	<script>
		angular.module("cal", [])
			.controller('cal-controllar', ['$scope', function($scope){
				$scope.operator = [
					{
						type: "plus",
						operator: "+"
					},
					{
						type: "minus",
						operator: "-"
					},
					{
						type: 'product',
						operator: '*'
					},
					{
						type: 'division',
						operator: '/'
					}
				];
				$scope.jisuan= function() {
					if(document.querySelector(".init").selected) {
						$scope.res = "请选择运算符";
					} else {
						$scope.res = eval(Number($scope.num1) + $scope.fuhao + Number($scope.num2));
					}
				};
			}]);
	</script>
</body>
```
在`<select>`标签中，创建ng-option特性，这里有个坑，，，就是，ng-option特性的语法。
###从 ng-option语法开始分析，解决问题1，2
我把它的语法剖析为这样。
> **() `as` () `group by` () `for` () `in` ()**

首先，从简单的开始
``` javascript
<select ng-model="fuhao" ng-options="i.operator as i.operator for i in operator" ng-change="jisuan()">
...
$scope.operator = [
					{
						type: "plus",
						operator: "+"
					},
					{
						type: "minus",
						operator: "-"
					},
					{
						type: 'product',
						operator: '*'
					},
					{
						type: 'division',
						operator: '/'
					}
				];
```
- 从`i.operator for i in operator`引出分析
	- `i`是谁？
它就是，angularJS在从$scope取到数据后，真正开始插入option时，操作的那个对象，这个对象的名字是我们自己起的，我在这叫它`i`也可以叫`m`或者任何in喜欢的名字
	- `i`从哪来？
	从后边的for-in语句来，很明显，他是operator数组的每一项。
    也就是说，angularJS将循环创建option标签，而创建的option标签的个数，来自`$scope.operator`的项数，每个标签的数据，如value、标签内容，来自`$scope.operator`的每一项的具体内容。

	- `i`将去哪？
这个就牵扯到是哪个位置了，
我们知道`i`是一个对象(当然，是在这个例子中，其他情况的对照这个例子举一反三)
`i.operator as i.operator for i in operator`
很简单
		- `as`**前边**的将作为，当用户选中这个option时，**select标签**对应的`ng-model特性的值`
		- 后边的，将作为**option标签内容**，填充到页面的下拉选项里。

- 总结一下，
> **() `as` () `group by` () `for` () `in` ()**

	我们可以这样填充这些括号
> **( `i`.下拉选项内容 ) `as` ( `i`.select的ng-model值 ) `group by` ( `i`.通过某属性进行的分组 ) `for` ( `i` ) `in` ( `i` 的来源 );**

### 解决问题3，默认option
 
- `ng-select`并不能解决问题，因为它要写在option标签上，虽然他可以指定默认option，但是我们是动态生成的标签，怎么加特性上去。
	- `ng-select="exp"` 若exp为true，则设置此option为默认option
- 其实非常简单，只需要

``` javascript
<script>
		angular.module("cal", [])
			.controller('cal-controllar', ['$scope', function($scope){
```
```
$scope.fuhao = "+"//插入默认设置，这样设置下初始值就行了，毕竟，双向绑定。。
```
``` javascript
				$scope.operator = [
					{
						type: "plus",
						operator: "+"
					},
					{
						type: "minus",
						operator: "-"
					},
					{
						type: 'product',
						operator: '*'
					},
					{
						type: 'division',
						operator: '/'
					}
				];
				$scope.jisuan= function() {
					if(document.querySelector(".init").selected) {
						$scope.res = "请选择运算符";
					} else {
						$scope.res = eval(Number($scope.num1) + $scope.fuhao + Number($scope.num2));
					}
				};
			}]);
	</script>
```

## 结语

还有一些其他语法，不多细说，有连接(英文的呢)--[angularJS官网连接-options内容位置](https://docs.angularjs.org/api/ng/directive/ngOptions)
都是自己摸索的，有错误之处，还望不吝赐教。