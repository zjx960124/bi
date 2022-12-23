<template>
    <div class="excel-create-container">
        <div class="left">
            <el-button type="primary" class="left-button" @click="goBack">
                <el-icon>
                    <ArrowLeft />
                </el-icon>返回
            </el-button>
            <div class="upload-file-container">
                <div class="container-content-title">
                    <sapn>当前数据源</sapn>
                    <el-select v-model="elSelectValue" class="m-2 elSelectValue" placeholder="请选择数据源"
                        @change="elSelectChange" clearable>
                        <el-option v-for="item in elSelectOptions" :key="item.dataSourceName"
                            :label="item.dataSourceShowName" :value="item.id" />
                    </el-select>
                </div>
                <div class="content-list">
                    <div class="content-list-title">
                        <span><img src="@/assets/data/search-sql.png" class="search" /><span>当前数据源</span></span>
                        <img src="@/assets/data/rest.png" class="rest" @click="getDataSetTableList" />
                    </div>
                    <div class="list-box">
                        <el-scrollbar style="height: 700px;" v-if="dataList && dataList.length > 0">
                            <div class="item" v-for="(item, idx) in dataList" :class="{ active: currentIndex === idx }"
                                @click="sqlClick(item, idx)">
                                <img src="@/assets/data/table-sql.png" />
                                <span>{{ item?.tableName }}</span>
                            </div>
                        </el-scrollbar>
                        <el-empty v-else :image="imgUrl" class="datasource-empty" description="暂无内容" />
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <section>
                <!-- 表标题及操作按钮 -->
                <div class="right-title">
                    <el-input v-model="dataSetName" style="width: 50%;" class="dataSetName" />
                    <div class="workBox">
                        <el-button v-if="typeName == 2" type="default"
                            style="height: 43px;width: 89px;border-radius: 22px;" @click="implementSql">
                            <img src="@/assets/data/sql-working.png" style="width: 16px;margin-right: 8px;" />
                            运行
                        </el-button>
                        <el-button type="primary" style="height: 43px;width: 89px;border-radius: 22px;"
                            @click="sqlSave">
                            <img src="@/assets/data/sql-save.png" style="width: 16px;margin-right: 8px;" />
                            保存
                        </el-button>
                    </div>
                </div>
                <!-- 表标题及操作按钮 -->
                <div class="right-content" v-if="tableData && tableData.length > 0">
                    <!-- sql输入框 -->
                    <div class="sql-input-box" v-if="typeName == 2">
                        <el-input v-model="textarea" :rows="8" resize='none' type="textarea" clearable
                            placeholder="请输入sql语句" />
                    </div>
                    <!-- sql输入框 -->
                    <div class="tableBox el-common-tableBox" :style="setTableHeight">
                        <div class="tableBox-title" v-if="typeName == 2">
                            <div class="title">
                                <img src="@/assets/data/sql-res.png" />
                                运行结果
                            </div>
                            <div class="workspace">
                                <el-button @click="implementSql">
                                    <img src="@/assets/data/sql-rest.png" />
                                    刷新预览
                                </el-button>
                            </div>
                        </div>
                        <!-- 运行内容数据 -->
                        <el-table v-if="!errorStatus" :data="tableData" :height="setHeiht" align="center" fit
                            :highlight-current-row="false" :border="false" show-overflow-tooltip style="width: 100%">
                            <el-table-column v-for="(it, idx) in headers" :key="idx" :prop="it.fieldName"
                                :label="it.showName" :min-width="it.minWidth" align="center" />
                        </el-table>
                        <div v-if="typeName == 1" style="display:flex;justify-content:center;margin-top: 5px;">
                            <el-pagination class="pagination" background
                                layout="->,prev, pager, next, total, sizes,jumper" :total="page.counts"
                                :page-size="page.pageSize" :current-page="page.pageNum" @current-change="currentChange"
                                @size-change="sizeChange" />
                        </div>
                        <!-- 运行内容数据 -->
                        <!-- 报错提示模块 -->
                        <div class="table-status" v-if="errorStatus">
                            <div class="status-title">
                                <div class="title"><img src="@/assets/data/sql-error.png" />
                                    运行失败</div>
                                <div class="info">SQL存在错误，请修改代码</div>
                            </div>
                            <div class="mt10">
                                <div class="detail">报错详情</div>
                                <div class="mt12 detail-desc">
                                    {{ erroMsg }}
                                </div>
                            </div>
                        </div>
                        <!-- 报错提示模块 -->
                    </div>
                </div>
                <!-- 暂无数据模块 -->
                <el-empty v-else :image="imgUrl" class="datasource-empty" description="暂无内容" />
                <!-- 暂无数据模块 -->
            </section>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import noData from '@/assets/data/noData.png';
import { ref, onMounted, reactive, toRefs, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { DataSource } from '@/api/dataSource';
import { executeSql, addDataSetOrFileFolder, getDataByTableId } from '@/api/dataset';
import { sqlItem, headerType } from '@/views/construction/types';

//暂无数据图片
const imgUrl = ref(noData);

//左侧表数据列表
let dataList = ref<Array<sqlItem>>();
let currentIndex = ref<number>();

//下拉框数据
let elSelectValue = ref();
const elSelectOptions = ref();

//获取地址栏参数
const route = useRoute();
const router = useRouter();
const { id, type } = route.query;

let dataSourceIds = ref();
if (id) {
    dataSourceIds.value = id;
}
let typeName = ref();
if (type) {
    typeName.value = type;
}


//右侧数据
const State = reactive({
    //数据集名称
    dataSetName: '未命名数据集',
    //表名
    tableName: '',
    textarea: '',
    //表格数据
    tableData: [],
    headers: [] as Array<headerType>,
    //报错详情
    errorStatus: false,
    erroMsg: '',
});

const { dataSetName, tableName, tableData, headers, textarea, erroMsg, errorStatus } = toRefs(State)

const { getDatasourceList, getTableByDataSourceId } = DataSource;//数据源接口

//获取所有数据源
const getAllDataSource = async () => {
    const {
        data: { counts, data },
    } = await getDatasourceList({ pageNum: 0, pageSize: 9999, accessType: 1 });
    if (counts > 0) {
        elSelectOptions.value = data;
    }
}

//获取数据源所有表数据
const getDataSetTableList = async () => {
    if (!elSelectValue.value) return ElMessage.error('请先选择数据源');
    dataList.value = [];
    const { data: { data } } = await getTableByDataSourceId({
        dataSourceId: elSelectValue.value,
        pageNum: 0,
        pageSize: 9999
    });
    if (data && data.length > 0) {
        dataList.value = data;
    }
}
//选择数据源
const elSelectChange = async (val: any) => {
    if (val) {
        elSelectValue.value = val;
        getDataSetTableList();
    }
}

//数据库数据集-通过表名获取数据
let page = ref({
    pageNum: 1,
    pageSize: 10,
    counts: 0
})
const getMySqlTableData = async () => {
    const { data: { data, counts } } = await getDataByTableId({
        pageNum: page.value.pageNum - 1,
        pageSize: page.value.pageSize,
        dataSourceId: elSelectValue.value,
        tableName: tableName.value
    });
    if (counts > 0) {
        const arr = data;
        let ars = [] as any;
        Object.keys(arr[0]).forEach((it) => {
            ars.push({
                fieldName: it,
                minWidth: 120,
                showName: it,
            })
        });
        headers.value = ars;
        tableData.value = arr;
        page.value.counts = counts;
    }
}

const currentChange = (val: any) => {
    page.value.pageNum = val;
    getMySqlTableData();
}

const sizeChange = (val: any) => {
    page.value.pageSize = val;
    getMySqlTableData();
}

//点击表获取sql数据
const sqlClick = (val: any, key: number) => {
    currentIndex.value = key;
    tableName.value = val.tableName;
    if (typeName.value == 1) {
        getMySqlTableData();
    }
}

//执行sql语句
const implementSql = async () => {
    headers.value = [];
    tableData.value = [];
    const resulit = await executeSql({
        dataSourceId: elSelectValue.value,
        sqlContent: textarea.value
    });

    if (resulit?.code != 200) {
        erroMsg.value = resulit?.msg;
        errorStatus.value = true;
    } else {
        errorStatus.value = false;
        const arr = resulit.data.data;
        let ars = [] as any;
        Object.keys(arr[0]).forEach((it) => {
            ars.push({
                fieldName: it,
                minWidth: 120,
                showName: it,
            })
        });
        headers.value = ars;
        tableData.value = arr;
    }
}

//保存
const sqlSave = async () => {
    const { data } = await addDataSetOrFileFolder({
        "createTime": "",
        "creator": "",
        "dataSetType": type,
        "datasourceId": elSelectValue.value,
        "excelFileUrl": "",
        "id": 0,
        "isDeleted": 0,
        "isFileFolder": 2,
        "name": dataSetName.value,
        "parentId": id,
        "sqlContent": textarea.value,
        "status": 0,
        "tableName": tableName.value,
        "updateTime": "",
        "updater": ""
    });
    if (data && Object.keys(data).length > 0) {
        ElMessage.success('保存成功');
        router.push('/dataset/list')
    }
}


//返回上一页
const goBack = () => {
    window.history.go(-1);
}

//设置表格高度
const setHeiht = computed(() => {
    if (typeName.value == 1) {
        return '100%'
    } else {
        return '480'
    }
});

const setTableHeight = computed(() => {
    if (typeName.value == 1) {
        return 'height:92%;'
    } else {
        return 'height:calc(100% - 190px);'
    }
})

onMounted(() => {
    getAllDataSource();//获取所有数据源
})

</script>
<style scoped lang="scss">
.excel-create-container {
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    justify-content: space-between;

    & .left {
        width: 264px;
        height: 100%;
        background: transparent;
        border-radius: 15px;

        .el-button.left-button {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            height: 43px;
            background: #6d79ff;
            border-radius: 22px;
        }

        .upload-file-container {
            width: 100%;
            height: calc(100% - 60px);
            background: #ffffff;
            border-radius: 15px;
            margin-top: 15px;

            &>.title {
                font-size: 14px;
                font-family: 'PingFang SC';
                font-weight: bold;
                color: #293270;
                line-height: 30px;
                text-align: center;
            }

            &>.container-content-title {
                text-align: left;
                padding: 0 15px;
                box-sizing: border-box;
                font-size: 14px;
                font-family: "PingFang SC";
                font-weight: bold;
                color: #293270;
                line-height: 30px;

                &>img {
                    // margin-left: 12px;
                }
            }

            &>.content-list {
                width: 100%;
                box-sizing: border-box;
                padding: 0 15px;

                & .content-list-title {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 25px;
                    margin-top: 15px;

                    & span {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        font-size: 14px;
                        font-family: "PingFang SC";
                        font-weight: bold;
                        color: #293270;
                        line-height: 30px;
                    }

                    & img.search {
                        width: 22px;
                    }

                    & img.rest {
                        width: 19px;
                        cursor: pointer;
                    }
                }

                & .list-box {
                    width: 100%;
                    height: auto;
                    display: flex;
                    flex-direction: column;

                    & .item {
                        width: 100%;
                        height: 35px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        padding: 0 15px;
                        box-sizing: border-box;
                        cursor: pointer;

                        & img {
                            width: 14px;
                            margin-right: 12px;
                        }

                        font-size: 12px;
                        font-family: "PingFang SC";
                        font-weight: 400;
                        color: #6B797F;
                        line-height: 30px;

                        &.active {
                            color: #6d79ff;
                        }
                    }
                }
            }
        }
    }

    & .right {
        width: calc(100% - 280px);
        height: 100%;
        background: transparent;
        border-radius: 15px;
        position: relative;

        & .right-title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 43px;
            font-size: 24px;
            font-family: 'PingFang SC';
            font-weight: bold;
            color: #293270;
            position: relative;
            padding-left: 15px;
            box-sizing: border-box;

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                width: 2px;
                height: 16px;
                background: linear-gradient(180deg, #0059e8 0%, #37e2c1 100%);
                border-radius: 1px;
            }

            .el-button {
                width: 113px;
                border-radius: 16px;
            }
        }

        section {
            height: 100%;
        }

        .right-content {
            width: 100%;
            height: calc(100% - 60px);
            background: #ffffff;
            border-radius: 15px;
            margin-top: 15px;
            position: relative;
        }

        .sql-input-box {
            width: 100%;
            height: auto;
            padding: 15px;
        }

        .tableBox {
            padding: 0 15px;
            box-sizing: border-box;
            width: 100%;
            // height: calc(100% - 190px) !important;
            display: inline-block;

            .tableBox-title {
                width: 100%;
                height: 35px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;

                & .title {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 14px;
                    font-family: "PingFang SC";
                    font-weight: bold;
                    color: #293270;
                    line-height: 30px;

                    &>img {
                        width: 34px;
                        margin-right: 8px;
                    }
                }

                & .workspace {
                    &>.el-button {
                        width: 101px;
                        height: 27px;
                        background: #FFFFFF;
                        border: 1px solid #DCDDE0;
                        border-radius: 14px;

                        img {
                            width: 17px;
                            margin-right: 4px;
                        }

                        :deep(span) {
                            font-size: 14px;
                            font-family: "PingFang SC";
                            font-weight: 500;
                            color: #BBBCBB;
                            line-height: 30px;
                        }
                    }
                }
            }

            .table-status {
                height: 300px;
                background: #FFFFFF;
                border: 2px solid #FF0100;
                border-radius: 15px;
                padding: 12px;
                box-sizing: border-box;
                overflow: auto;

                & .status-title {
                    width: 100%;
                    height: auto;
                    display: flex;
                    flex-direction: column;

                    & div.title {
                        display: flex;
                        font-size: 14px;
                        font-family: "PingFang SC";
                        font-weight: bold;
                        color: #FF0100;
                        align-items: center;

                        & img {
                            width: 16px;
                            margin-right: 8px;
                        }
                    }

                    & div.info {
                        font-size: 14px;
                        font-family: "PingFang SC";
                        font-weight: bold;
                        color: #FF0100;
                        display: flex;
                        align-items: center;
                        margin-top: 8px;
                    }
                }

                .detail {
                    font-size: 14px;
                    font-family: "PingFang SC";
                    font-weight: bold;
                    color: #FF0100;
                    line-height: 30px;
                    display: flex;
                    justify-content: flex-start;
                }

                .detail-desc {
                    font-size: 14px;
                    font-family: "PingFang SC";
                    font-weight: bold;
                    color: #FF0100;
                    text-align: left;
                }
            }
        }


        .datasource-empty {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.elSelectValue {
    width: 100%;
    height: 29px;

    ::v-deep .el-input__wrapper {
        background: #FFFFFF;
        border: 1px solid #D5D5DE;
        border-radius: 12px;
        box-shadow: unset;
        height: 29px;
    }
}

.dataSetName {
    ::v-deep .el-input__wrapper {
        background: transparent !important;
        box-shadow: unset;

        .el-input__inner {
            font-size: 24px;
            font-family: 'PingFang SC';
            font-weight: bold;
            color: #293270;
        }
    }
}
</style>
  