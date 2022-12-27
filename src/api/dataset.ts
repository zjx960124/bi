import Request from '../request/request';

//数据集-获取所有数据集
export function getAllDataSet() {
    return Request('/rest/bi/getAllDataSet', {
        method: 'get',
        responseType: 'json',
    })
}

//数据集-新增数据集或者文件夹/rest/bi/addDataSetOrFileFolder
export function addDataSetOrFileFolder(data: any) {
    return Request('/rest/bi/addDataSetOrFileFolder', {
        method: 'post',
        responseType: 'json',
        data
    })
}

//数据集-执行sql语句/rest/bi/executeSql
export function executeSql(params: any) {
    return Request('/rest/bi/executeSql', {
        method: 'get',
        responseType: 'json',
        params
    })
}

//数据集-根据数据源id与表信息名称查询数据
export function getDataByTableId(params: any) {
    return Request(`/rest/bi/getDataByTableId/${params.tableName}/${params.dataSourceId}`, {
        method: 'get',
        responseType: 'json',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize,
        },
    });
}

//数据集-获取数据集文件夹和数据集列表
export function getFileFolderAndDataSets() {
    return Request('/rest/bi/getFileFolderAndDataSets', {
        method: 'get',
        responseType: 'json',
    })
}

//数据集-更改文件夹或数据集信息
export function updateDataSetOrFileFolder(params: any) {
    return Request('/rest/bi/updateDataSetOrFileFolder', {
        method: 'put',
        responseType: 'json',
        data: params
    })
}

//数据集-删除文件夹或数据集
export function deleteDataSetOrFileFolder(dataSetOrFileFolderId: any) {
    return Request(`/rest/bi/deleteDataSetOrFileFolder/${dataSetOrFileFolderId}`, {
        method: 'delete',
        responseType: 'json',
    })
}