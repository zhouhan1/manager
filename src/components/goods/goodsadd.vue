<template>
	<el-card class="box-card">
		<!-- 面包屑-->
		<my-bread level1="商品管理" level2="商品列表"></my-bread>
		<el-alert title="添加商品信息" type="success" center show-icon style="margin:20px 0;">
		</el-alert>
		<!--步骤条-->
		<el-steps :active="1*active" finish-status="success" align-center style="margin-bottom:20px;">
			<el-step title="基本信息"></el-step>
			<el-step title="商品参数"></el-step>
			<el-step title="商品属性"></el-step>
			<el-step title="商品图片"></el-step>
			<el-step title="商品内容"></el-step>
		</el-steps>
		<!--侧边导航-->
		<el-form label-position="top" label-width="80px" :model="form" style="height:400px;overflow: auto;">
			<el-tabs tab-position="left" @tab-click="handleClick" v-model="active">
				<el-tab-pane label="基本信息" name="1">
					<el-form-item label="商品名称">
						<el-input v-model="form.goods_name"></el-input>
					</el-form-item>
					<el-form-item label="商品价格">
						<el-input v-model="form.goods_price"></el-input>
					</el-form-item>
					<el-form-item label="商品重量">
						<el-input v-model="form.goods_weight"></el-input>
					</el-form-item>
					<el-form-item label="商品数量">
						<el-input v-model="form.goods_number"></el-input>
					</el-form-item>			
					<el-form-item label="商品分类">
						  <el-cascader
    v-model="value"
    expand-trigger="hover"
    :options="options"
    :props=""
    @change="handleChange"></el-cascader>
					</el-form-item>		
				</el-tab-pane>
				<el-tab-pane label="商品参数" name="2">商品参数</el-tab-pane>
				<el-tab-pane label="商品属性" name="3">商品属性</el-tab-pane>
				<el-tab-pane label="商品图片" name="4">商品图片</el-tab-pane>
				<el-tab-pane label="商品内容" name="5">商品内容</el-tab-pane>
			</el-tabs>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				active: "1",
//				goods_name商品名称不能为空
//				goods_cat以为','分割的分类列表不能为空
//				goods_price价格不能为空
//				goods_number数量不能为空
//				goods_weight重量不能为空
//				goods_introduce介绍可以为空
//				pics上传的图片临时路径（对象）可以为空
//				attrs商品的参数（数组）可以为空				
				form: {
					goods_name:"",
					goods_cat:"",
					goods_price:"",
					goods_number:"",
					goods_weight:"",
					goods_introduce:"",
					pics:"",
					attrs:""
				}
			}
		},
		methods: {
			handleClick(tab) {
				this.active = tab.name
			}
		}
	}
</script>

<style>

</style>