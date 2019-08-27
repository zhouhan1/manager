<template>
	<el-card class="box-card">
		<!-- 面包屑-->
		<my-bread level1="商品管理" level2="分类参数"></my-bread>
		<el-alert title="只允许为三级分类设置参数" type="error" style="margin:20px 0;">
		</el-alert>
		<!--级联选择器-->
		<el-form label-position="left" label-width="80px">
			<el-form-item label="商品分类">
				<el-cascader v-model="value" expand-trigger="hover" :options="options" :props="defaultProps" clearable :show-all-levels="false" @change="handleChange"></el-cascader>
			</el-form-item>
		</el-form>
		<!--参数分类-->
		<el-tabs v-model="active" type="card" @tab-click="handleClick">
			<el-tab-pane label="动态参数" name="1">
				<el-button type="danger">设置动态参数</el-button>
				<el-table :data="dynamicsParams" style="width: 100%">
					<el-table-column type="expand" label="#">
						<template slot-scope="scope">
							<el-tag :key="tag" v-for="tag in scope.row.attr_vals" closable :disable-transitions="false" @close="handleClose(scope.row,tag)">
								{{tag}}
							</el-tag>
							<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
							</el-input>
							<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

						</template>
					</el-table-column>
					<el-table-column label="属性名称" prop="attr_name">
					</el-table-column>
					<el-table-column label="操作">
						<el-button type="primary" icon="el-icon-edit" circle :plain="true" size="mini"></el-button>
						<el-button type="danger" icon="el-icon-delete" circle :plain="true" size="mini"></el-button>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="静态参数" name="2">
				<el-button type="danger">设置静态参数</el-button>
				<el-table :data=" staticParams" style="width: 100%">
					<el-table-column type="index" label="#" width="80">
					</el-table-column>
					<el-table-column prop="attr_name" label="属性名称" width="180">
					</el-table-column>
					<el-table-column prop="attr_vals" label="属性值">
					</el-table-column>
					<el-table-column label="操作">
						<el-button type="primary" icon="el-icon-edit" circle :plain="true" size="mini"></el-button>
						<el-button type="danger" icon="el-icon-delete" circle :plain="true" size="mini"></el-button>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				value: [],
				options: [],
				defaultProps: {
					value: 'cat_id',
					label: 'cat_name',
					children: 'children'
				},
				dynamicsParams: [],
				 staticParams:[],
				active: "1",
				inputValue: '',
				inputVisible: false
			}
		},
		created() {
			this.loadOptions()
		},
		methods: {
			//			点击x按钮
			handleClose(scope, tag) {
				scope.attr_vals.splice(scope.attr_vals.indexOf(tag), 1);
				let putData = {
					attr_name: scope.attr_name,
					attr_sel: "many",
					attr_vals: scope.attr_vals.join(",")
				}
				//      发送请求
				this.$http.put("categories/" + scope.cat_id + "/attributes/" + scope.attr_id, putData).then((res) => {
					console.log(res)
				})
			},
			//    按下回车键
			handleInputConfirm(scope) {
				let inputValue = this.inputValue;
				if(inputValue) {
					scope.attr_vals.push(inputValue);
					let putData = {
						attr_name: scope.attr_name,
						attr_sel: "many",
						attr_vals: scope.attr_vals.join(",")
					}
					//      发送请求
					this.$http.put("categories/" + scope.cat_id + "/attributes/" + scope.attr_id, putData).then((res) => {
						console.log(res)
					})
				}
				this.inputVisible = false;
				this.inputValue = '';
			},
			//    点击增加按钮
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			//			tabs切换时触发函数
			handleClick() {
               if(this.value.length === 3&&this.active==="2"){
               						//					获取静态参数
                  this.$http.get("categories/"+this.value[2]+"/attributes?sel=only").then((res)=>{
                  	this.staticParams=res.data.data
                  	console.log(this.staticParams)
                  })
               }
			},
			//			级联列表改变
			handleChange() {
				if(this.value.length === 3) {
					//					获取动态参数
					this.$http.get("categories/" + this.value[2] + "/attributes?sel=many").then((res) => {
						this.dynamicsParams = res.data.data
						this.dynamicsParams.forEach((item) => {
							item.attr_vals = item.attr_vals.trim().length === 0 ? [] : item.attr_vals.trim().split(",")
						})
					})


				}

			},
			loadOptions() {
				this.$http.get("categories?type=3").then((res) => {
					this.options = res.data.data
				})
			}
		}
	}
</script>

<style>
	.el-tag+.el-tag {
		margin-left: 10px;
	}
	
	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}
	
	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
</style>