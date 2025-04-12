<template>
  <div class="overflow-x-auto">
    <table class="min-w-[400px] w-full border-2">
      <thead>
        <tr>
          <th
            v-for="(col, index) in option.column"
            :key="index"
            class="text-center px-4 py-2 whitespace-nowrap font-normal"
          >
            {{ col.label }}
          </th>
          <th
            v-if="hasActions"
            class="text-center px-4 py-2 whitespace-nowrap font-normal"
          >
            {{ $t("table.action") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, rowIndex) in tableData"
          :key="rowIndex"
          class="border-b"
        >
          <td
            v-for="(col, colIndex) in option.column"
            :key="colIndex"
            class="text-center px-4 py-2 whitespace-nowrap"
          >
            {{ item[col.tableDataprop] }}
          </td>
          <td v-if="hasActions" class="text-center px-4 py-2 whitespace-nowrap">
            <div class="flex justify-center gap-2">
              <!-- <van-button size="mini" type="primary" @click="handleEdit(item)">
                {{ $t("table.edit") }}
              </van-button> -->
              <van-button size="mini" type="danger" @click="handleDelete(item)">
                {{ $t("table.delete") }}
              </van-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { $t } from "@/locales";
const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  option: {
    type: Object,
    default: () => ({ column: [] })
  },
  showActions: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(["edit", "delete"]);

const hasActions = computed(
  () => props.showActions && props.tableData.length > 0
);

const handleEdit = row => emit("edit", row);
const handleDelete = row => emit("delete", row);
</script>
