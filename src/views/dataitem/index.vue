<template>
  <div>
    <van-field
      v-model="fieldValue"
      :label="$t('dataitem.dataitem')"
      :placeholder="$t('dataitem.chosedataitem')"
      is-link
      readonly
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom" round>
      <van-picker
        :columns="columns"
        :default-index="defaultIndex"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <!-- 输入框和添加按钮 -->
    <div v-if="!isParentTree">
      <div class="add-item flex gap-1">
        <van-field
          class="w-1/3"
          v-model="newItemName"
          placeholder="请输入数据项名称"
        />
        <van-button class="w-1/2" type="primary" @click="handleAdd">{{
          $t("table.add")
        }}</van-button>
      </div>
    </div>

    <div v-if="isParentTree">
      <div class="add-item flex gap-1">
        <van-field
          class="w-1/3"
          v-model="newItemNameTree"
          placeholder="请输入数据项名称"
        />
        <van-button class="w-1/2" type="primary" @click="handleAddTree">{{
          $t("table.add")
        }}</van-button>
      </div>
      <van-field
        v-model="parentField"
        :label="$t('dataitem.parent')"
        is-link
        readonly
        @click="showPickerParent = true"
      />
      <van-popup v-model:show="showPickerParent" position="bottom" round>
        <van-picker
          :columns="columnsParent"
          :default-index="defaultIndex"
          @cancel="showPickerParent = false"
          @confirm="onConfirmParent"
        />
      </van-popup>
    </div>
  </div>
  <div class="p-4">
    <TableVant
      :option="option"
      :showActions="true"
      :tableData="tableData"
      @delete="onDelete"
    />
  </div>
  <van-pagination
    v-model="currentPage"
    :total-items="total"
    :items-per-page="8"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import TableVant from "@/components/VantTable.vue";
import { $t } from "@/locales";
import { getDataItem, createDataItem, deleteDataItem } from "@/api/dataitem";
import { showSuccessToast } from "vant";
//表格相关的操作
const currentPage = ref(1);
const total = ref(1);

const tableData = ref([{ name: "数据项1" }]);
const showPickerParent = ref(false);
const option = ref({
  column: [{ label: computed(() => $t("table.value")), tableDataprop: "name" }]
});
const newItemNameTree = ref("");
const handleAddTree = () => {
  const data = { name: newItemNameTree.value, parent: currentParentHerf.value };
  addData(data);
};
const onDelete = row => {
  const url = row._links.self.href;
  const parts = url.split(/[^0-9]+/);
  const lastNumber = parts.pop();
  console.log(lastNumber);
  deleteData(lastNumber);
};

//选择操作的数据项
const currentDataItem = ref("airports");
//picker列表
const columns = ref([
  { text: computed(() => $t("dataitem.airport")), value: "airports" },
  { text: computed(() => $t("dataitem.auditmethod")), value: "auditMethods" },
  { text: computed(() => $t("dataitem.company")), value: "companies" },
  { text: computed(() => $t("dataitem.findingtype")), value: "findingTypes" },
  { text: computed(() => $t("dataitem.dept")), value: "departments" },
  { text: computed(() => $t("dataitem.process")), value: "processes" },
  { text: computed(() => $t("dataitem.risksource")), value: "riskSources" },
  { text: computed(() => $t("dataitem.rootanalyze")), value: "rootAnalyzes" }
]);
const columnsParent = ref([
  { text: computed(() => $t("dataitem.dept")), value: "departments" }
]);
// 选中的城市名（显示在 Field 中）
const fieldValue = ref("");
//夫部门的值
const parentField = ref("");
// 控制弹出层
const showPicker = ref(false);

// 默认高亮哪一项
const defaultIndex = ref(0);

const onConfirm = (value: { selectedOptions: any[] }) => {
  showPicker.value = false;
  fieldValue.value = value.selectedOptions[0].text;
  currentDataItem.value = value.selectedOptions[0].value;
};
const currentParentHerf = ref("");
const onConfirmParent = (value: { selectedOptions: any[] }) => {
  showPickerParent.value = false;
  parentField.value = value.selectedOptions[0].text;
  currentParentHerf.value = value.selectedOptions[0].value;
  console.log(currentParentHerf.value, "父部门");
};
// 👇 监听 currentDataItem.value，根据值动态修改列配置
watch(currentDataItem, value => {
  if (isTree()) {
    option.value = {
      column: [
        { label: computed(() => $t("table.value")), tableDataprop: "name" }
      ]
    };
    fetchData(value);
    isParentTree.value = true;
  } else {
    option.value = {
      column: [
        { label: computed(() => $t("table.value")), tableDataprop: "name" }
      ]
    };
    fetchData(value);
    isParentTree.value = false;
  }
});
const test = ref();
onMounted(() => {
  fetchData("airports");
});
// 监听 currentPage 的变化
watch(currentPage, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    fetchData(currentDataItem.value);
  }
});

// 新增数据项的名称
const newItemName = ref("");

// 处理新增数据项
const handleAdd = () => {
  const data = { name: newItemName.value };
  addData(data);
};
const isTree = () => {
  if (
    ["departments", "processes", "riskSources", "rootAnalyzes"].includes(
      currentDataItem.value
    )
  ) {
    getTreeData();
    return true;
  }
};
const isParentTree = ref(false);

const addData = data => {
  const url = `/${currentDataItem.value}`; // 构建对应的API端点
  createDataItem(url, data)
    .then(res => {
      showSuccessToast({ message: $t("tools.reqOK"), wordBreak: "break-word" });
      console.log("新增数据项成功", res);
      newItemName.value = "";
      newItemNameTree.value = "";
      fetchData(currentDataItem.value); // 成功后重新获取数据
      getTreeData();
      parentField.value = "";
    })
    .catch(error => {
      console.error("新增数据项失败", error);
    });
};
const getTreeData = () => {
  // 这里放picker
  const url = `/${currentDataItem.value}`;
  getDataItem(url, { page: 0, size: 1000000000000000 }).then(res => {
    const test = res.data._embedded[currentDataItem.value].map(item => ({
      text: item.name,
      value: item._links.self.href
    }));
    console.log(test, "生效了");
    columnsParent.value = test;
  });
};
const deleteData = id => {
  const url = `/${currentDataItem.value}`; // 构建对应的API端点
  deleteDataItem(url, id)
    .then(res => {
      showSuccessToast({
        message: $t("tools.deleteOK"),
        wordBreak: "break-word"
      });
      console.log("删除数据项成功", res);
      fetchData(currentDataItem.value); // 成功后重新获取数据
      getTreeData();
    })
    .catch(error => {
      console.error("删除数据项失败", error);
    });
};

const fetchData = val => {
  const url = `/${val}`;
  getDataItem(url, { page: currentPage.value - 1, size: 8 }).then(res => {
    total.value = res.data.page.totalElements;
    tableData.value = res.data._embedded[val];
  });
};
</script>
