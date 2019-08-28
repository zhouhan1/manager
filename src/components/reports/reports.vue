<template>
	<el-card class="box-card">
		<!-- 面包屑-->
		<my-bread level1="数据统计" level2="数据报表"></my-bread>
		<div id="main" style="width: 600px;height:400px;"></div>
	</el-card>
</template>

<script>
	var echarts = require("echarts")
	export default {
		mounted() {
			this.use()
		},
		methods: {
			use() {
				var myChart = echarts.init(document.getElementById('main'));
				this.$http.get("reports/type/1").then((res)=>{
					var option2=res.data.data
									var  option1 = {
					title: {
						text: '数据统计'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					}
				};
          var option={...option1,...option2}
          console.log(option)
          myChart.setOption(option);
				})	

			}
		}
	}
</script>

<style>

</style>