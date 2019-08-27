<template>
	<el-card class="box-card">
		<!-- 面包屑-->
		<my-bread level1="商品管理" level2="商品列表"></my-bread>
		<el-button type="success" style="margin:20px 0" @click="addcate()">添加分类</el-button>
		<!--表格-->
		<el-table height="450px" style="width: 100%" :data="list">
			<!--<el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>-->
				  <el-tree-grid
      prop="cat_name"
      label="分类名称"
      treeKey="cat_id"
      parentKey="cat_pid"
      levelKey="cat_level"
      childKey="children"
      ></el-tree-grid>   
			<el-table-column label="级别" width="180">
				<template slot-scope="scope">
					<span v-if="scope.row.cat_level===0">一级</span>
					<span v-if="scope.row.cat_level===1">二级</span>
					<span v-if="scope.row.cat_level===2">三级</span>
				</template>
			</el-table-column>
			<el-table-column prop="cat_name" label="是否有效" width="180">
				<template slot-scope="scope">
					{{scope.row.cat_deleted ? "无效" : "有效"}}
				</template>
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
					<el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[5,10]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>	
				
			<!--	添加分类的对话框-->
			<el-dialog title="添加分类" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="分类名称" label-width="100px">
    	 <el-input v-model="form.cat_name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分类" label-width="100px">
    	{{value}}
    	<el-cascader v-model="value" expand-trigger="hover" :options="options" :props="defaultProps" clearable change-on-select></el-cascader>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="add()">确 定</el-button>
  </div>
</el-dialog>
	</el-card>
</template>

<script>
	const ElTreeGrid = require('element-tree-grid')
	export default {
			 components: {
    ElTreeGrid
 },
		data() {
			return {
				value: [],
				defaultProps: {
					value: 'cat_id',
					label: 'cat_name',
					children: 'children'
				},
				options: [],
				list: [],
				dialogFormVisible: false,
				form: {
					cat_name: '',
					cat_pid:-1,
					cat_level:0
				},
                pagenum: 1,
                pagesize: 5,
                total: 0
			}
		},
		created() {
			this.loadOptions()
		},
		methods: {
//			发送请求
           add(){
           	if(this.value.length===0){
           		this.form.cat_pid=0
           		this.form.cat_level=0
           	} else if (this.value.length===1) {
           		this.form.cat_pid=this.value[0]
           		this.form.cat_level=1
           	}else if (this.value.length === 2){
           		this.form.cat_pid=this.value[1]
           		this.form.cat_level=2
           	}
           	this.$http.post("categories",this.form).then((res)=>{
           		this.dialogFormVisible = false
           		this.form={}
           		this.loadOptions()
           		console.log(res)
           	})
           	
           },
			//			显示添加分类对话
			addcate() {
				this.dialogFormVisible = true
				this.$http.get("categories?type=2").then((res)=>{
					this.options=res.data.data
				})
			},
			loadOptions() {
				this.$http.get("categories?type=3&pagenum="+this.pagenum+"&pagesize="+this.pagesize).then((res) => {
					this.list = res.data.data.result
					this.total = res.data.data.total
					console.log(res)
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pagesize = val
				this.pagenum = 1
				this.loadOptions()
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.pagenum = val
				this.loadOptions()
			}
		}
	}
</script>

<style>

</style>