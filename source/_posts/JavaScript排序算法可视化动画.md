---
title: JavaScript排序算法可视化动画
date: 2017-03-26 11:22:36
tags: javascript
categories: demos
---

这个题目，老早就知道了，但是当时因为忙着学习别的东西，虽然感觉挺有趣，但是一直也没着手去做。这几天在补全排序算法的知识，刚好，也把这个给做了出来。

## 简介

首先简单分析下问题，大概有这几个点需要解决
- 排序算法
- 动画
- 如何将算法用动画展示

很显然，第三点是最难的。

想要实现这个，首先要会排序算法，关于常用的排序算法，在文章里就不在多说，这个不是我们的重点，我仅仅贴出我写的算法代码。

<!-- more -->

动画其实也很简单，用css设置一些过度效果，比如颜色啊，渐渐消失，渐渐出现啊，之类的。也不多说，大家可以随意发挥。我做的，只设置了颜色的渐变。

我们重点分析，如何将算法的每一步用动画展示。

首先贴出排序算法代码，如果大家对排序算法很熟悉了，那么可以直接跳过，看下边的内容

## 排序算法的代码

下边的算法，我没有对他们进行很完善的测试，只是简单的试了几个数组，如果大家发现问题，请留言联系我，我会尽快改正。

- 冒泡排序

```
// 冒泡排序，共三个，后两个为改进算法
function bubbleSort(arr) {
	for (let i = 0, len = arr.length; i < len; i++) {
		for (let j = 0; j < len - i; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				// 解构赋值，交换变量值
			}
		}
	}
	return arr;
}

// 改进：记录交换位置，提高速度
function bubbleSortPlus(arr) {
	let i = arr.length;
	while (i > 0) {
		var position = 0;
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				// 解构赋值，交换变量值
				position = j;
			}
		}
		i = position; // 因为，只有position为0时候，才说明排好了。
	}
	return arr;
}

// 改进：双冒泡
function bubbleSortDb(arr) {
	var top = arr.length - 1,
		bottom = 0,
		j;

	while (bottom < top) {
		for (j = bottom; j < top; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				// 解构赋值，交换变量值
			}
		}
		top--;
		for (; j > bottom; j--) {
			if (arr[j] < arr[j - 1]) {
				[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
				// 解构赋值，交换变量值
			}
		}
		bottom++;
	}
	return arr;
}
```

- 选择排序

```
// 选择排序
function selectSort(arr) {
	var minIndex;
	for (let i = 0, len = arr.length; i < len; i++) {
		minIndex = i;
		for (let j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}
		[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
	}
	return arr;
}
```

- 插入排序

```
// 插入排序 ，后边有二分优化后的
function insertionSort(arr) {
	for (let i = 1, len = arr.length; i < len; i++) {
		let keyNum = arr[i],
			j = i - 1;
		while (j >= 0 && arr[j] > keyNum) {
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = keyNum;
	}
	return arr;
}

// 二分查找优化 插入排序
function binaryInsertionSort(arr) {
	for (let i = 1, len = arr.length; i < len; i++) {
		let keyNum = arr[i],
			left = 0,
			right = i - 1;

		// 此处，要考虑两边界时候，出现的问题，不能简单的left < right，当在右边界时候，left需要再移动一位。
		while (left <= right) {
			let middle = Math.floor((left + right) / 2);
			if (keyNum > arr[middle]) {
				left = middle + 1;
			} else {
				right = middle - 1;
			}
		}
		// 比left大的，向右位移一位
		for (let j = i - 1; j >= left; j--) {
			arr[j + 1] = arr[j];
		}
		arr[left] = keyNum;
	}

	return arr;
}
```

- 希尔排序

```
/ 希尔排序
function shellSort(arr) {
	let len = arr.length,
		gap = Math.ceil(Math.floor(len / 2) / 2) * 2 - 1;
	for (; gap > 0; gap = gap - 2) {
		for (let i = gap; i < len; i++) {
			let keyNum = arr[i],
				j = i - gap;
			while (j >= 0 && arr[j] > keyNum) {
				arr[j + gap] = arr[j];
				j = j - gap;
			}
			arr[j + gap] = keyNum;
		}
	}

	return arr;
}
```

- 归并排序

```
// 归并排序
function mergerSort(arr) {
	let len = arr.length;
	if (len < 2) {
		return arr;
	}
	let middle = Math.floor(len / 2),
		left = arr.slice(0, middle),
		right = arr.slice(middle);
	return merger(mergerSort(left), mergerSort(right));
}

function merger(left, right) {
	var arr = [];
	while (left.length && right.length) {
		if (left[0] <= right[0]) {
			arr.push(left.shift());
		} else {
			arr.push(right.shift());
		}
	}
	while (left.length) {
		arr.push(left.shift());
	}
	while (right.length) {
		arr.push(right.shift());
	}
	return arr;
}
```

- 快速排序

```
// 快速排序
function quickSort(arr) {
	sort(0, arr.length - 1);
	return arr;

	function sort(left, right) {
		let i = left, //左游标 右游标
			j = right,
			stardard = arr[left];

		if ((right - left) > 0) {
			while (i < j) {
				for (; i < j; j--) {
					if (arr[j] < stardard) {
						arr[i++] = arr[j];
						break;
					}
				}
				for (; i < j; i++) {
					if (arr[i] > stardard) {
						arr[j--] = arr[i];
						break;
					}
				}
			}
			arr[i] = stardard;
			sort(left, i - 1);
			sort(i + 1, right);
		}
	}
}
```

- 堆排序

```
/ 堆排序
function heapSort(arr) {

	function heapify(arr, i, unorderedHeapSize) {
		let largest = i,
			leftChild = 2 * i + 1,
			rightChild = 2 * i + 2;
		if (leftChild < unorderedHeapSize && arr[leftChild] > arr[largest]) {
			largest = leftChild;
		}
		if (rightChild < unorderedHeapSize && arr[rightChild] > arr[largest]) {
			largest = rightChild;
		}
		if (largest != i) {
			swap(arr, i, largest);
			heapify(arr, largest, unorderedHeapSize);
		}

	}

	function swap(arr, x, y) {
		[arr[x], arr[y]] = [arr[y], arr[x]];
	}

	function buildMaxHeap(arr) {
		for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
			heapify(arr, i, arr.length);
		}
	}

	// 建堆
	buildMaxHeap(arr);

	// 堆排序
	for (let i = arr.length - 1; i > 0; i--) {
		swap(arr, 0, i);
		heapify(arr, 0, i);
	}
	return arr;

}
```

## 分析，如何展示算法动画

1.
如果要把排序过程用柱状图变换来表示，很显然，也就是说，把对数组的操作过程，转变成了对一组dom的操作。

我们对算法都有一定了解了，纵观来看，实现可视化动画，其实就是表现出几个关键的元素。
- 每趟的关键目标元素（target——蓝色）
- 正在比较的元素（checked——绿色）
- 经过比较，需要与target元素进行交换的checked元素（selecked——红色）

2.
那么如何把上边这些关键元素，以动画效果反应出来呢？

一上来，我们可能回想，那就排一步，展示一步呗。但是，排一步，展示一步就等于是让js引擎走一步，然后暂停js引擎，再让渲染引擎走一步，如此循环往复直到结束。但是js引擎开弓没有回头箭，我们还没有一个方法，可以让它先停下来歇一歇。

有的同学可能说，用定时器，但是，往深处一想就会发现定时器是不行的，它有问题：
- js引擎单线程，导致使用定时器的结果跟我们期望的不同。
- 作用域问题

如果使用定时器，必然要大量使用，因为每一步dom操作，都需要一个定时器，在设计过程解决上边的问题，肯定一头包。（我当时仔细想了想，就放弃了，太乱了）

**所以，我们要换一个思路**

3.
我们都知道，动画其实就是一帧一帧的静态画面，也就是一个个状态的变换。那么我们其实可以**在对纯数组进行排序的过程中，记录下我们需要的所有帧，然后等排序结束后，对我们收集到的所有帧，进行从头到尾的展示**

假如我们的html是这样
```
<div id="box">
	<div class="item" style="height:54px">54</div>
                ·····
                ·····
</div>
```
用高度代表了数字

可以这样设计
```
numArr = box盒子下，所有item的innerHTML转换成数字（Number()方法）
function sort(arr) {
  var animationArr = [];// 这个数组用来记录帧
  // 下边某个算法的具体过程，在排序的过程中，记录帧
  ...

  return animationArr // 将帧数组返回
}

sort(numArr);
```

4.
那么帧数组中的数据要怎么设计呢？其实我们知道，排序算法都有**每一趟，和每一趟的第一步，第二步，第三步，.......**

而根据我们的具体动画需要，可以做如下设计

```
// 最内层的对象，只是一个例子，是快速排序时候的每帧的可能状态。
animationArr = [
	[
    	{
			currentArrStart = undefined,
			currentArrEnd = undefined,
			target = undefined,
			selected = undefined,
			checked = undefined,
			removeSelected = undefined,
    	},
    	...
    	...
	],
	...
	...
]
```
最外层数组的每一项，表示每一趟；里层数组的每一项，表示每一步的帧状态对象，每种排序算法，最内层的帧状态对象的属性可能是不同的，我们可以根据具体需要来设计。

5.
我们拿到了帧数组，那么如何展现动画呢？

很简单，一个`setInterval()`，每次循环，就展示一帧，而且，这样设计的话，我们还可以通过控制循环间隔时间，来实现加快速度，减慢速度的效果。

**分析结束**
> 接下来，我就拿快速排序为例子，来一步步展示，如何实现它。

## 以快速排序为例的具体实现过程

1. 首先，简单说下项目结构
![项目结构图](1.png)
  很简单，没什么复杂的

2. html
我们有这样的DOM结构
```
<div id="box">
		<div class="item" style="height:54px">54</div>
		<div class="item" style="height:14px">14</div>
		<div class="item" style="height:77px">77</div>
		<div class="item" style="height:28px">28</div>
		<div class="item" style="height:99px">99</div>
		<div class="item" style="height:65px">65</div>
		<div class="item" style="height:49px">49</div>
		<div class="item" style="height:89px">89</div>
		<div class="item" style="height:21px">21</div>
		<div class="item" style="height:25px">25</div>
		<div class="item" style="height:50px">50</div>
		<div class="item" style="height:80px">80</div>
		<div class="item" style="height:19px">19</div>
		<div class="item" style="height:37px">37</div>
		<div class="item" style="height:31px">31</div>
	</div>
	<div id="sortBtn">
		<button id="quickSortBtn" data-method="quickSort">快速排序动画</button>
	</div>
```

3. css
其实关键是下边的四个`.item--`就是我们在展示动画过程中要频繁操作的类名了。
```
.item {
	padding: 10px 5px;
	background-color: gray;
	color: #fff;
	display: inline-block;
	margin-right: 5px;
	vertical-align: bottom;
	transition: background-color .5s;
}
#box {
  padding: 5px 0;
}
.item--current {
	background-color: skyblue;
}
.item--checked {
	background-color: green;
}
.item--selected {
	background-color: red;
}
.item--target {
	background-color: blue;
}
```

4.  排序算法
对于每种算法，其实我们都要实现两个方法:
 - 传入纯数字的数组，进行排序，传出帧数组
 - 这种排序算法对应的dom操作方法

以快速排序为例
```
function quickSort(arrDom) {
	// 传递进来一个Dom类数组，对其进行排序
	var arr = [],
		animationArr = []; // 这个数组中，存储每一次动画的数据

	for (let i = 0, len = arrDom.length; i < len; i++) {
		arr.push(Number(arrDom[i].innerHTML));
	}

	sort(0, arr.length - 1);
	return animationArr;

	function sort(left, right) {
		let i = left, //左游标 右游标
			j = right,
			animationArrStep = [],
			stardard = arr[left];
		animationArrStep.push({
			currentArrStart: left,
			currentArrEnd: right
		});
		animationArrStep.push({
			target: left
		});
		if ((right - left) > 0) {
			while (i < j) {
				for (; i < j; j--) {
					animationArrStep.push({
						checked: j
					});
					if (arr[j] < stardard) {
						animationArrStep.push({
							target: i,
							selected: j
						});
						animationArrStep.push({
							removeSelected: i
						});
						arr[i++] = arr[j];

						break;
					}
				}
				for (; i < j; i++) {
					animationArrStep.push({
						checked: i
					});
					if (arr[i] > stardard) {
						animationArrStep.push({
							target: j,
							selected: i
						});
						animationArrStep.push({
							removeSelected: j
						});
						arr[j--] = arr[i];
						break;
					}
				}
			}
			arr[i] = stardard;
			animationArr.push(animationArrStep);
			sort(left, i - 1);
			sort(i + 1, right);
		}
	}
}


// 这里是快速排序对应的dom操作方法，我们在方法形参处设计了帧状态对象的具体内容
function quickSortAnimationDom(arrDomBox, {
	currentArrStart = undefined,
	currentArrEnd = undefined,
	// 表示本趟有关的项的开始和结尾
	target = undefined,
	selected = undefined,
	checked = undefined,
	removeSelected = undefined, // 用来在交换后，移除selected状态。
}) {
	// arrDom 是包裹柱状图的盒子，也就是#box
	if (checked !== undefined) {
		arrDomBox.children[checked].classList.add("item--checked");
	} else if (target !== undefined) {
		arrDomBox.children[target].classList.add("item--target");
		if (selected !== undefined) {

			arrDomBox.children[selected].classList.add("item--selected");

			let a = arrDomBox.children[target].cloneNode(true),
				b = arrDomBox.children[selected].cloneNode(true);
			arrDomBox.replaceChild(b, arrDomBox.children[target]);
			arrDomBox.replaceChild(a, arrDomBox.children[selected]);
		}
	} else if (removeSelected !== undefined) {
		arrDomBox.children[removeSelected].classList.remove("item--selected");
	} else if (currentArrStart !== undefined && currentArrEnd !== undefined) {
		for (let i = currentArrStart; i <= currentArrEnd; i++) {
			arrDomBox.children[i].classList.add("item--current");
		}
	}
}
```
关于dom算法，有一点需要说明，

我们传进来的arrDomBox，是因为，排序免不了进行dom的交换操作，为了每次都确保我们获取的是最新的item节点，而不是插入前的，所以，必须从父节点出发寻找。

关于这一点，有不明白的同学，可以留言，咱们再讨论。


5.
animation.js动画相关

我们需要把它做成一个小模块，避免过多的绑定到window上变量，同时，也避免定时器操作过程中，取变量错误。

这个模块，我做的比较简单，没有实现很多功能，比如
- 控制速度大小
- 自动生成数组
- 算法切换

等等吧，但是都留有可控制的口子。
比如，速度，大家可以自己做一做，控制下`speed`变量就可以了
切换算法也很简单，不多说了。

```
function SortAnimation() {
	this.timer = 0;
	this.arrDomBox = {};
	this.animationArr = [];
	this.speed = 500;
	this.sortMethod = {};
	this.currentMethod = '';
	// sortMethod 的数据结构为{method：数组排序并返回动画数组的方法名, animationMethod: dom排序方法名}
}

SortAnimation.prototype = {
	getData: function(arrDomBox, method) {
		this.arrDomBox = arrDomBox;
		this.currentMethod = method;
		this.animationArr = this.sortMethod[method].method(arrDomBox.children);
	},

	ownedMethod: function(methodObj) {
		this.sortMethod = methodObj;
	},

	startAnimation: function() {
		var that = this;
		// 为了保存下,this，用了闭包，当然还有别的处理办法。
		return function() {
			if (that.animationArr.length === 0) {
				// 清除DOM样式
				for (let i = 0, len = that.arrDomBox.children.length; i < len; i++) {
					that.arrDomBox.children[i].classList.remove("item--target", "item--current", "item--selected", "item--checked");
				}
				// 动画结束
				clearTimeout(that.timer);
			} else if (that.animationArr[0].length > 0) {
				that.sortMethod[that.currentMethod].animationMethod(that.arrDomBox, that.animationArr[0][0]);
				that.animationArr[0].shift();
			} else {
				// 清除DOM样式
				for (let i = 0, len = that.arrDomBox.children.length; i < len; i++) {
					that.arrDomBox.children[i].classList.remove("item--target", "item--current", "item--selected", "item--checked");
				}
				// 进入下一趟排序的动画
				that.animationArr.shift();
			}
		};
	}
}

window.sa = new SortAnimation();
```

6.
大家也应该看到了，其实写的是有一定复用性的。根据我们写的，最后就可以调用了
```
<script>
		var sortBtn = document.querySelector("#sortBtn");
		
		sa.ownedMethod({
			quickSort: {
				method: quickSort,
				animationMethod: quickSortAnimationDom
			}
		})

		sortBtn.addEventListener("click", function(event) {
			var arrDomBox = document.querySelector("#box");
			// 注意，一定要是父元素，因为，在替换元素的过程中，被替换元素不会消失，如果在最开始直接引用子元素，那么，将无法取到替换后的元素
			sa.getData(arrDomBox, event.target.dataset.method);
			sa.timer = setInterval(sa.startAnimation(), sa.speed);
		});
	</script>
```

大功告成！！！

## 结语总结

其实挺有意思的，博主在这只是抛砖引玉，希望大家有兴趣可以动手试一试。当然，如果有朋友有任何疑问，请下边留言告诉我，能力范围内，我一定答复。

如有什么错误，请一定指正。谢谢了













