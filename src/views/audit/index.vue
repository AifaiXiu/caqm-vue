<template>
  <div class="p-4">
    <TableVant
      :tableData="tableData"
      :option="option"
      :showActions="true"
      @edit="onEdit"
      @delete="onDelete"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TableVant from "@/components/VantTable.vue";

const tableData = ref([
  { name: "张三", age: 28, job: "药剂师" },
  { name: "李四", age: 35, job: "研究员" },
  { name: "王五", age: 22, job: "学生" },
  { name: "赵六", age: 42, job: "讲师" }
]);

const option = ref({
  column: [
    { label: "姓名", tableDataprop: "name" },
    { label: "年龄", tableDataprop: "age" },
    { label: "职业", tableDataprop: "job" }
  ]
});

const onEdit = row => {
  console.log("编辑：", row);
};

const onDelete = row => {
  console.log("删除：", row);
};
</script>
