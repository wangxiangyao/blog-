	var myChart1 = echarts.init(document.getElementById('main-1'));
	var myChart2 = echarts.init(document.getElementById('main-2'));
	var myChart3 = echarts.init(document.getElementById('main-3'));
	var myChart4 = echarts.init(document.getElementById('main-4'));
       // 指定图表的配置项和数据

        var option1 = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        var data = [
		    [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
		    [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
		];

		option2 = {
		    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
		        offset: 0,
		        color: '#f7f8fa'
		    }, {
		        offset: 1,
		        color: '#cdd0d5'
		    }]),
		    title: {
		        text: '1990 与 2015 年各国家人均寿命与 GDP'
		    },
		    legend: {
		        right: 10,
		        data: ['1990', '2015']
		    },
		    xAxis: {
		        splitLine: {
		            lineStyle: {
		                type: 'dashed'
		            }
		        }
		    },
		    yAxis: {
		        splitLine: {
		            lineStyle: {
		                type: 'dashed'
		            }
		        },
		        scale: true
		    },
		    series: [{
		        name: '1990',
		        data: data[0],
		        type: 'scatter',
		        symbolSize: function (data) {
		            return Math.sqrt(data[2]) / 5e2;
		        },
		        label: {
		            emphasis: {
		                show: true,
		                formatter: function (param) {
		                    return param.data[3];
		                },
		                position: 'top'
		            }
		        },
		        itemStyle: {
		            normal: {
		                shadowBlur: 10,
		                shadowColor: 'rgba(120, 36, 50, 0.5)',
		                shadowOffsetY: 5,
		                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
		                    offset: 0,
		                    color: 'rgb(251, 118, 123)'
		                }, {
		                    offset: 1,
		                    color: 'rgb(204, 46, 72)'
		                }])
		            }
		        }
		    }, {
		        name: '2015',
		        data: data[1],
		        type: 'scatter',
		        symbolSize: function (data) {
		            return Math.sqrt(data[2]) / 5e2;
		        },
		        label: {
		            emphasis: {
		                show: true,
		                formatter: function (param) {
		                    return param.data[3];
		                },
		                position: 'top'
		            }
		        },
		        itemStyle: {
		            normal: {
		                shadowBlur: 10,
		                shadowColor: 'rgba(25, 100, 150, 0.5)',
		                shadowOffsetY: 5,
		                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
		                    offset: 0,
		                    color: 'rgb(129, 227, 238)'
		                }, {
		                    offset: 1,
		                    color: 'rgb(25, 183, 207)'
		                }])
		            }
		        }
		    }]
		};
		option3 = {
		    title: {
		        text: '多雷达图'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        x: 'center',
		        data:['某软件','某主食手机','某水果手机','降水量','蒸发量']
		    },
		    radar: [
		        {
		            indicator: [
		                {text: '品牌', max: 100},
		                {text: '内容', max: 100},
		                {text: '可用性', max: 100},
		                {text: '功能', max: 100}
		            ],
		            center: ['25%','40%'],
		            radius: 80
		        },
		        {
		            indicator: [
		                {text: '外观', max: 100},
		                {text: '拍照', max: 100},
		                {text: '系统', max: 100},
		                {text: '性能', max: 100},
		                {text: '屏幕', max: 100}
		            ],
		            radius: 80,
		            center: ['50%','60%'],
		        },
		        {
		            indicator: (function (){
		                var res = [];
		                for (var i = 1; i <= 12; i++) {
		                    res.push({text:i+'月',max:100});
		                }
		                return res;
		            })(),
		            center: ['75%','40%'],
		            radius: 80
		        }
		    ],
		    series: [
		        {
		            type: 'radar',
		             tooltip: {
		                trigger: 'item'
		            },
		            itemStyle: {normal: {areaStyle: {type: 'default'}}},
		            data: [
		                {
		                    value: [60,73,85,40],
		                    name: '某软件'
		                }
		            ]
		        },
		        {
		            type: 'radar',
		            radarIndex: 1,
		            data: [
		                {
		                    value: [85, 90, 90, 95, 95],
		                    name: '某主食手机'
		                },
		                {
		                    value: [95, 80, 95, 90, 93],
		                    name: '某水果手机'
		                }
		            ]
		        },
		        {
		            type: 'radar',
		            radarIndex: 2,
		            itemStyle: {normal: {areaStyle: {type: 'default'}}},
		            data: [
		                {
		                    name: '降水量',
		                    value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
		                },
		                {
		                    name:'蒸发量',
		                    value:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
		                }
		            ]
		        }
		    ]
		};
		myChart1.setOption(option1);
		myChart2.setOption(option2);
		myChart3.setOption(option3);
		window.addEventListener('resize', function(){
			myChart1.setOption(option1);
			myChart1.resize();

		});
        window.addEventListener('resize', function(){
        	myChart2.setOption(option2)
        	myChart2.resize();
        });
         window.addEventListener('resize', function(){
        	myChart3.setOption(option3)
        	myChart3.resize();
        });
         var sideButton = document.querySelector(".barside-w-btn");
         sideButton.addEventListener('click', function() {
			myChart1.resize();
			myChart2.resize();
			myChart3.resize();
		});
		