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
						{{value}}
						  <el-cascader
    v-model="value"
    expand-trigger="hover"
    :options="options"
    :props="defaultProps" clearable @change="handleChange"></el-cascader>
					</el-form-item>	
				</el-tab-pane>
				<el-tab-pane label="商品参数" name="2">
					<el-form-item v-for="(item,i) in dynamicsParams" :label="item.attr_name" :key="i">
					<el-checkbox-group v-model="item.attr_vals">
                            <el-checkbox :label="item2" border v-for="(item2,i) in item.attr_vals" :key="i"></el-checkbox>
                         </el-checkbox-group>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="商品属性" name="3">
					<el-form-item v-for="(item,i) in staticParams" :label="item.attr_name" :key="i">
						<el-input v-model="item.attr_vals"></el-input>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="商品图片" name="4">
					<el-form-item>
					<el-upload
  action="http://localhost:8888/api/private/v1/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="handlesuccess"
  :headers="headers"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="商品内容" name="5">
					<el-form-item>
						<quill-editor v-model="form.goods_introduce"></quill-editor>
						  <el-button type="primary" @click="addGoods()">添加商品</el-button>
					</el-form-item>
				</el-tab-pane>
			</el-tabs>
		</el-form>
	</el-card>
</template>

<script>
	import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
	export default {
		  components: {
    quillEditor
  },
		data() {
			return {
				active: "1",
//				goods_name商品名称不能为空
//             goods_price价格不能为空
//				goods_number数量不能为空
//				goods_weight重量不能为空
//				goods_cat以为','分割的分类列表不能为空 分类的id 将数组转化为字符串
//				attrs商品的参数（数组）可以为空	
//				goods_introduce介绍可以为空
//				pics上传的图片临时路径（对象）可以为空
			
				form: {
					goods_name:"",
					goods_price:"",
					goods_number:"",
					goods_weight:"",					
					goods_cat:"",
					goods_introduce:"",
					pics:[],
					attrs:[]
				},
//				级联
                value:[],
                options:[],
                defaultProps:{
                	   value: 'cat_id',
                        label: 'cat_name',
                        children: 'children'
                },
//              动态参数
              dynamicsParams:[],
//            静态参数
              staticParams:[],
//            上传图片
              headers:{
              	Authorization:localStorage.getItem("token")
              	}
			}
		},
		created(){
			this.loadOptions()
		},
		methods: {
//			添加商品
            addGoods(){
            	//				将数组转化为字符串
				this.form.goods_cat=this.value.join(",")
//				处理参数问题
          const dy=this.dynamicsParams          
          const st=this.staticParams
          const arr1=dy.map((item)=>{
//            	item.attr_vals = item.attr_vals.join(',')
              	return {
              		attr_id:item.attr_id,
                   attr_value:item.attr_vals
              	}
              })
          console.log(arr1)
          const arr2=st.map((item1)=>{
//            	item1.attr_vals = item1.attr_vals.join(',')
              	return {
              		attr_id:item1.attr_id,
                   attr_value:item1.attr_vals
              	}
              })
           console.log(arr2)
          this.form.attrs = [...arr1, ...arr2]
          console.log(this.form.attrs)
	           this.$http.post("goods",this.form).then((res)=>{
	           	console.log(res)
                   const{data,meta:{status, msg}}=res.data
                   if(status===201){
                   	this.$message.success(msg)
                   	this.$router.push({name:"goodslist"})
                   }
	           })
          },
//			点击文件列表中已上传的文件时的钩子
			handlePreview(file){
				
			},
//			文件列表移除文件时的钩子
            handleRemove(file){
//          	file.response.data.tmp_path  移除临时路径
            	const index=this.form.pics.findIndex((item)=>{
            		return item.pic===file.response.data.tmp_path
            	})
            	this.form.pics.splice(index, 1)
            },
//          文件上传成功时的钩子
            handlesuccess(file){
//          	file.data.tmp_path图片临时路径
            	this.form.pics.push({pic:file.data.tmp_path})
            },
			handleClick(tab) {
				this.active = tab.name
				if(this.active=="2" ||this.active=="3" ){
					if(this.value.length!==3){
						this.$message.error('请选择商品的三级分类')
                        return
					}
//					获取动态参数
					this.$http.get("categories/"+this.value[2]+"/attributes?sel=many").then((res)=>{						
						this.dynamicsParams=res.data.data
						this.dynamicsParams.forEach((item)=>{
							item.attr_vals=item.attr_vals.trim().length===0 ? []  :  item.attr_vals.trim().split(",")							
						})
					})
//					获取静态参数
                  this.$http.get("categories/"+this.value[2]+"/attributes?sel=only").then((res)=>{
                  	this.staticParams=res.data.data
                  })
					
				}
			},
			handleChange(){
				if(this.value.length!==3){
					 this.$message.warning('商品只能添加到三级分类')
					 this.value.length===0
				}
			},
			loadOptions(){
				this.$http.get("categories?type=3").then((res)=>{
					this.options=res.data.data
				})
			}
		}
	}
</script>

<style>
.ql-editor{
	min-height:300px;
}
</style>
