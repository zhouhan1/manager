<template>
	<el-card class="box-card">
		<!-- 面包屑-->
		<my-bread level1="订单管理" level2="订单列表"></my-bread>
		<!--表格-->
		<el-table :data="orderlist" style="width: 100%" height="500px">
			<el-table-column type="index" label="#" width="80">
			</el-table-column>
			<el-table-column prop="order_number" label="订单编号" width="180">
			</el-table-column>
			<el-table-column prop="order_price" label="订单价格">
			</el-table-column>
			<el-table-column label="是否付款">
				<template slot-scope="scope">
					<span v-if="scope.row.pay_status==='0'">未付款</span>
					<span v-if="scope.row.pay_status==='1'">已付款</span>
				</template>
			</el-table-column>
			<el-table-column prop="is_send" label="是否发货">
			</el-table-column>
			<el-table-column label="下单时间">
				<template slot-scope="scope">
					{{scope.row.create_time | fmtDate}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" circle :plain="true" size="mini" @click="editorder(scope.row)"></el-button>
					 <el-button icon="el-icon-search" circle :plain="true" size="mini" @click="seeorder(scope.row.order_id)"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[10,15]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
		<!-- 修改订单状态-->
		<el-dialog title="修改订单" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="订单是否发货" :label-width="formLabelWidth">
					<el-radio-group v-model="form.is_send">
						<el-radio label="是">是</el-radio>
						<el-radio label="否">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="订单支付" :label-width="formLabelWidth">
					<el-radio-group v-model="form.order_pay">
						<el-radio label="0">未支付</el-radio>
						<el-radio label="1">支付宝</el-radio>
						<el-radio label="2">微信</el-radio>
						<el-radio label="3">银行卡</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="订单价格" :label-width="formLabelWidth">
					<el-input v-model="form.order_price" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="订单数量" :label-width="formLabelWidth">
					<el-input v-model="form.order_number" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="订单状态" :label-width="formLabelWidth">
					<el-radio-group v-model="form.pay_status">
						<el-radio label="0">未付款</el-radio>
						<el-radio label="1">已付款</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="edit">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 查看订单-->
		<el-dialog title="查看订单" :visible.sync="seeFormVisible">
			<el-form :model="see">
				<<el-form-item label="订单是否发货" :label-width="formLabelWidth">
					<!--<el-radio-group v-model="see.is_send">
						<el-radio label="是"></el-radio>
						<el-radio label="否"></el-radio>
					</el-radio-group>-->
					<el-input v-model="see.is_send" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="订单支付" :label-width="formLabelWidth">
					<el-radio-group v-model="see.order_pay">
						<el-radio label="0">未支付</el-radio>
						<el-radio label="1">支付宝</el-radio>
						<el-radio label="2">微信</el-radio>
						<el-radio label="3">银行卡</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="订单价格" :label-width="formLabelWidth">
					<el-input v-model="see.order_price" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="订单数量" :label-width="formLabelWidth">
					<el-input v-model="see.order_number" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="订单状态" :label-width="formLabelWidth">
					<el-radio-group v-model="see.pay_status">
						<el-radio label="0">未付款</el-radio>
						<el-radio label="1">已付款</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="seeFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="seeFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>		
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				orderlist: [],
				total: 0,
				pagenum: 1,
				pagesize: 10,
				dialogFormVisible: false,
				seeFormVisible:false,
				formLabelWidth:"180px",
				form:{
					id:"",
					is_send:"",
					order_pay:"",
					order_price:"",
					order_number:"",
					pay_status:""
				},
				see:{}
			}
		},
		created() {
			this.getorderdata()
		},
		methods: {
         //			查看订单
             seeorder(scope){          	
             	this.seeFormVisible=true
             	this.$http.get("orders/"+scope).then((res)=>{
             		this.see=res.data.data
             	})
             },
			//			修改订单状态
			editorder(scope) {
				console.log(scope)
				this.form.id=scope.order_id
				this.form.is_send=scope.is_send
				this.form.order_pay=scope.order_pay
				this.form.order_price=scope.order_price
				this.form.order_number=scope.order_number
				this.form.pay_status=scope.pay_status
				this.dialogFormVisible = true
			},
//			修改订单发送请求
           edit(){
             this.$http.put("orders/"+this.form.id,this.form).then((res)=>{
             	console.log(this.form)
             	this.dialogFormVisible = false
					this.getorderdata()					
				})
           },
			getorderdata() {
				this.$http.get("orders?pagenum=" + this.pagenum + "&pagesize=" + this.pagesize).then((res) => {
					this.orderlist = res.data.data.goods
					this.total = res.data.data.total
				})
			},
			handleSizeChange(val) {
				this.pagesize = val
				this.pagenum = 1
				this.getorderdata()
			},
			handleCurrentChange(val) {
				this.pagenum = val
				this.getorderdata()
			}
		}
	}
</script>

<style>

</style>