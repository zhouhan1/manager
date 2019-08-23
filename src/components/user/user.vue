<template>
	<el-card class="box-card">
		<!-- 面包屑-->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!--搜索框-->
		<el-row class="searchArea">
			<el-col :span="24">
				<el-input placeholder="请输入内容" class="searchInput" v-model="searchValue" @clear="loaduser()" clearable>
					<el-button slot="append" icon="el-icon-search" @click="handleSearch()"></el-button>
				</el-input>
				<el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
			</el-col>
		</el-row>
		<!--表格-->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" label="#" width="50">
			</el-table-column>
			<el-table-column prop="username" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="email" label="邮箱">
			</el-table-column>
			<el-table-column prop="mobile" label="电话">
			</el-table-column>
			<el-table-column label="创建日期">
				<template slot-scope="scope">
					{{scope.row.create_time | fmtDate}}
				</template>
			</el-table-column>
			<el-table-column label="用户状态">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="handleSwitchChange(scope.row)">
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" circle :plain="true" size="mini" @click="edit(scope.row)"></el-button>
					<el-button type="danger" icon="el-icon-delete" circle :plain="true" size="mini" @click="del(scope.row.id)"></el-button>
					<el-button type="success" icon="el-icon-check" circle :plain="true" size="mini" @click="role(scope.row)"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
		<!--添加弹框-->
		<el-dialog title="添加用户" :visible.sync="dialogFormVisible">
			<el-form :model="formData" :rules="rules" ref="formData">
				<el-form-item label="用户名" label-width="100px" prop="username">
					<el-input v-model="formData.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" label-width="100px" prop="password">
					<el-input v-model="formData.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" label-width="100px">
					<el-input v-model="formData. email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" label-width="100px">
					<el-input v-model="formData.mobile" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUser('formData')">确 定</el-button>
			</div>
		</el-dialog>
		<!--编辑用户弹框-->
		<el-dialog title="编辑用户" :visible.sync="editUserDialogFormVisible">
			<el-form ref="myform" label-width="100px" :model="formData">
				<el-form-item label="用户名" prop="username">
					<el-input disabled v-model="formData.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="formData.email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话">
					<el-input v-model="formData.mobile" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editUserDialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleEdit">确 定</el-button>
			</div>
		</el-dialog>
		<!--分配角色-->
		<el-dialog title="分配角色" :visible.sync="roleFormVisible">
			<el-form>
				<el-form-item label="用户名" label-width="100px">
					{{roleusername}}
				</el-form-item>
				<el-form-item label="角色" label-width="100px">
					      <el-select v-model="rolerid">
                          <el-option label="请选择" :value="-1"></el-option>
                          <el-option :label="item.roleName" :value="item.id" v-for="(item,i) in roleslist" :key="i"></el-option>
                 </el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="roleFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="setrole()">确 定</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>
<script>
	export default {
		data() {
			return {
				dialogFormVisible: false,
				editUserDialogFormVisible: false,
				roleFormVisible: false,
				formData: {
					username: '',
					password: '',
					email: '',
					mobile: ''
				},
				// 表单验证规则
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 5,
							message: '长度在 1 到 5 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 5,
							message: '长度在 1 到 5 个字符',
							trigger: 'blur'
						}
					]
				},
				searchValue: "",
				total: 0,
				pagenum: 1,
				pagesize: 2,
				tableData: [],
				roleusername:"",
				roleslist:[],
				rolerid:"",
				rolsuserid:""
			}
		},
		created() {
			this.getuserList()
		},
		methods: {
			//			分配角色
			role(roles) {
				this.roleFormVisible = true
				this.roleusername=roles.username
				this.rolsuserid=roles.id
			this.$http.get("roles").then((res)=>{
					this.roleslist=res.data.data
				})
			this.$http.get("users/"+this.rolsuserid).then((res)=>{
				this.rolerid=res.data.data.rid
			})
			},
//			编辑角色
setrole(){
	this.$http.put('users/'+this.rolsuserid+'/role',{rid:this.rolerid}).then((res)=>{
		this.roleFormVisible = false
	})
},
			//			用户状态
			handleSwitchChange(user) {
				const AUTH_TOKEN = localStorage.getItem("token")
				this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
				this.$http.put("users/" + user.id + "/state/" + user.mg_state).then((res) => {
					const {
						data,
						meta: {
							msg,
							status
						}
					} = res.data
					if(status === 200) {
						console.log(res.data)
						this.$message.success(msg)
					} else {
						this.$message.error(msg)
					}
				})
			},
			//			编辑用户
			edit(id) {
				this.formData = id
				this.editUserDialogFormVisible = true
			},
			handleEdit() {
				const AUTH_TOKEN = localStorage.getItem("token")
				this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
				this.$http.put("users/" + this.formData.id, {
					mobile: this.formData.mobile,
					email: this.formData.email
				}).then((res) => {
					const {
						meta: {
							status,
							msg
						}
					} = res.data
					if(status === 200) {
						this.editUserDialogFormVisible = false
						this.$message.success(msg)
						this.editData = {}
					} else {
						this.$message.error(msg)
					}
				})
			},
			//			删除用户
			del(id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$http.delete("users/" + id).then((res) => {
						const {
							meta: {
								msg,
								status
							}
						} = res.data
						if(status === 200) {
							this.pagenum = 1
							this.$message({
								type: 'success',
								message: '删除成功!'
							})
							this.getuserList()
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//			添加用户
			addUser(formName) {
				//				验证
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const AUTH_TOKEN = localStorage.getItem("token")
						this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
						this.$http.post("users", this.formData).then((res) => {
							const {
								meta: {
									status,
									msg
								}
							} = res.data
							if(status === 201) {
								//						添加成功了
								this.dialogFormVisible = false
								// 提示成功
								this.$message.success(msg)
								//          清空数据
								this.formData = {}
							} else {
								this.$message.error(msg);
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			//			搜索
			handleSearch() {
				this.getuserList()
			},
			//			清空搜索
			loaduser() {
				this.getuserList()
			},
			//			渲染列表
			getuserList() {
				const AUTH_TOKEN = localStorage.getItem("token")
				this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
				this.$http.get("users", {
					params: {
						pagenum: this.pagenum,
						pagesize: this.pagesize,
						query: this.searchValue
					}
				}).then((res) => {
					const {
						data: {
							users,
							total
						},
						meta: {
							msg,
							status
						}
					} = res.data
					if(status === 200) {
						this.tableData = users
						this.total = total
					} else {
						this.$message.error(msg);
					}
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pagesize = val
				this.pagenum = 1
				this.getuserList()
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.pagenum = val
				this.getuserList()
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