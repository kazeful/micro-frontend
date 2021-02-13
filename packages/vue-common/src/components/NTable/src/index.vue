<template>
  <div class="n-table">
    <!-- toolbar -->
    <div v-if="showToolbar" class="toolbar">
      <div>
        <slot name="toolbar-left" />
      </div>
      <div>
        <div v-if="showCustomColumn">
          <el-dropdown split-button type="primary">
            自定义列
            <template #dropdown>
              <el-dropdown-menu class="custom-column-dropdown">
                <el-checkbox
                  v-model="checkAll"
                  :indeterminate="isIndeterminate"
                  @change="handleCheckAll"
                >
                  全选
                </el-checkbox>
                <el-checkbox-group
                  v-model="checkedColumns"
                  class="custom-column-dropdown-checkbox-group"
                  @change="handleCheckedColumns"
                >
                  <el-checkbox v-for="column in columns" :key="column.prop" :label="column.label">
                    {{ column.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- elTable -->
    <el-table
      ref="elTable"
      v-loading="loading"
      class="el-table"
      v-bind="$attrs"
      v-on="getElTableListeners()"
    >
      <slot />

      <template v-for="(item, index) in tableColumns">
        <el-table-column
          v-if="item.type === 'selection' || item.type === 'index'"
          :key="index"
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type == 'selection'"
        />
        <el-table-column v-else :key="index" v-bind="item" :align="item.align ?? 'center'">
          <template v-if="$scopedSlots[`${item.prop}-header`]" #header="scope">
            <slot :name="`${item.prop}-header`" v-bind="scope" />
          </template>
          <template v-if="$scopedSlots[item.prop]" #default="scope">
            <slot :name="item.prop" v-bind="scope" />
          </template>
        </el-table-column>
      </template>

      <template #append>
        <slot name="append" />
      </template>
    </el-table>
    <!-- elPagination -->
    <el-pagination
      ref="elPagination"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { constant, omit } from 'lodash-es'

export default {
  name: 'NTable',
  inheritAttrs: false,
  props: {
    showToolbar: {
      type: Boolean,
      default: true,
    },
    showCustomColumn: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: constant([]),
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: constant([10, 20, 30, 40, 50]),
    },
    total: {
      type: Number,
      default: 0,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
  },
  data() {
    return {
      checkAll: false,
      checkedColumns: [],
      isIndeterminate: true,
    }
  },
  computed: {
    columnsLabel() {
      return this.columns.map(item => item.label)
    },
    tableColumns() {
      return this.columns.filter(item => this.checkedColumns.includes(item.label))
    },
  },
  watch: {
    columns: {
      handler(newVal) {
        this.checkedColumns = newVal.map(item => item.label)
      },
      immediate: true,
    },
  },
  methods: {
    handleCheckAll(val) {
      this.checkedColumns = val ? this.columnsLabel : []
      this.isIndeterminate = false
    },
    handleCheckedColumns(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.columnsLabel.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columnsLabel.length
    },

    handleCurrentChange(currentPage) {
      this.$emit('update:currentPage', currentPage)
      this.$emit('currentChange')
      this.$emit('current-change')
    },
    handleSizeChange(pageSize) {
      this.$emit('update:currentPage', 1)
      this.$emit('update:pageSize', pageSize)
      this.$emit('pageSizeChange')
      this.$emit('page-size-change')
    },

    getElTableListeners() {
      const omitListeners = [
        'update:currentPage',
        'update:current-page',
        'currentChange',
        'current-change',
        'update:pageSize',
        'update:page-size',
        'pageSizeChange',
        'page-size-change',
      ]
      return omit(this.$listeners, omitListeners)
    },
  },
}
</script>

<style scoped>
.n-table .toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.n-table .el-table {
  margin-top: 16px;
  margin-bottom: 16px;
}

.custom-column-dropdown {
  max-height: 160px;
  overflow-y: auto;
  padding: 0 10px;
}

.custom-column-dropdown .custom-column-dropdown-checkbox-group {
  display: flex;
  flex-direction: column;
}
</style>
