<template>
<el-card class="box-card">
			<!-- 面包屑-->
		<my-bread level1="商品管理" level2="商品列表"></my-bread>
				<!--搜索框-->
		<el-row class="searchArea">
			<el-col :span="24">
				<el-input placeholder="请输入内容" class="searchInput">
					<el-button slot="append" icon="el-icon-search" v-model="searchValue"></el-button>
				</el-input>
				<el-button type="success" plain @click="$router.push({name:'goodsadd'})">添加商品</el-button>
			</el-col>
		</el-row>
				<!--表格-->
	<!--<el-table :data="tableData" style="width: 100%" height="350">
			<el-table-column type="index" label="#" width="50">
			</el-table-column>
			<el-table-column prop="goods_name" label="商品名称" width="380">
			</el-table-column>
			<el-table-column prop="goods_name" label="商品价格">
			</el-table-column>
			<el-table-column prop="goods_name" label="商品重量">
			</el-table-column>
			<el-table-column label="创建日期" prop="upd_time">
				<template slot-scope="scope">
					{{scope.row.upd_time | fmtDate }}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" circle :plain="true" size="mini"></el-button>
					<el-button type="danger" icon="el-icon-delete" circle :plain="true" size="mini"></el-button>
					<el-button type="success" icon="el-icon-check" circle :plain="true" size="mini"></el-button>
				</template>
			</el-table-column>
		</el-table>-->
		<!--分页-->
		 <el-pagination
		 	@size-change="handleSizeChange" 
		 	@current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[50,100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
</template>

<script>
	export default{
		data(){
			return{
				tableData:{},
				searchValue: "",
				pagenum: 1,
				pagesize:50,
				total:0
			}
		},
		created(){
			this.getgoodsdata()
		},
		methods:{
			getgoodsdata(){
              this.$http.get("goods",{
              	params:{
              		pagenum:this.pagenum,
              		pagesize:this.pagesize
              	}
              }).then((res)=>{
              	console.log(res)
              	this.tableData=res.data.data.goods
              	this.total=res.data.data.total
              })
			},
			handleSizeChange(val) {
				this.pagesize = val
				this.pagenum = 1
				this.getgoodsdata()
			},
			handleCurrentChange(val) {
				this.pagenum = val
				this.getgoodsdata()
			}
			}

		}
</script>

<style>
		.box-card {
		height: 100%;
	}
	
	.searchArea {
		margin-top: 10px;
		margin-bottom: 10px;
	}
	
	.searchArea .searchInput {
		width: 350px;
	}
</style>