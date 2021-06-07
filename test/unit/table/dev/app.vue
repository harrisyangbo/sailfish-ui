<template>
  <DhTable
    :columns="columns"
    :table-data="tableData"
    :context="{$rows: [1, 2], $filter: {a: 1, b: 2}}"
    :current-page.sync="page"
    :page-size.sync="pageSize"
    :total.sync="total"
    @selection-change="log"
    @showDocker="log"
    @sort-change="log"
    @size-change="log(pageSize)"
    @page-change="log(cccc)"
    @imageView="log($event)"
  />
</template>

<script>
import { mockData, mockColumns } from '../testData';

export default {
  name: 'TestApp',
  data() {
    return {
      columns: mockColumns,
      tableData: mockData,
      pageSize: 10,
      page: 1,
      total: 1000,
    };
  },
  methods: {
    log(data) {
      console.log(133123123, data);
    }
  }
};
</script>


