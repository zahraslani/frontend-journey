<script setup lang="ts">
import { ref, computed } from 'vue'

// داده‌های نمونه
const users = ref([
  { id: 1, name: 'زهرا اصلانی', email: 'zahra@example.com', role: 'ادمین', status: 'فعال' },
  { id: 2, name: 'علی رضایی', email: 'ali@example.com', role: 'کاربر', status: 'غیرفعال' },
  { id: 3, name: 'سارا محمدی', email: 'sara@example.com', role: 'کاربر', status: 'فعال' },
  { id: 4, name: 'رضا کریمی', email: 'reza@example.com', role: 'مدیر', status: 'فعال' },
  { id: 5, name: 'مریم حسینی', email: 'maryam@example.com', role: 'کاربر', status: 'غیرفعال' },
])

const searchQuery = ref('')
const sortBy = ref<'name' | 'role'>('name')
const currentPage = ref(1)
const itemsPerPage = 3

// فیلتر و مرتب‌سازی
const filteredUsers = computed(() => {
  let result = users.value
  
  if (searchQuery.value) {
    result = result.filter(u => 
      u.name.includes(searchQuery.value) || 
      u.email.includes(searchQuery.value)
    )
  }
  
  return result.sort((a, b) => a[sortBy.value].localeCompare(b[sortBy.value]))
})

// صفحه‌بندی
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredUsers.value.slice(start, start + itemsPerPage)
})
</script>

<template>
  <div class="table-container">
    <div class="header">
      <h3>👥 لیست کاربران</h3>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="جستجوی نام یا ایمیل..." 
        class="search-input"
      />
    </div>

    <table>
      <thead>
        <tr>
          <th @click="sortBy = 'name'">نام</th>
          <th>ایمیل</th>
          <th @click="sortBy = 'role'">نقش</th>
          <th>وضعیت</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <span :class="['badge', user.status === 'فعال' ? 'active' : 'inactive']">
              {{ user.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- صفحه‌بندی -->
    <div class="pagination">
      <button @click="currentPage--" :disabled="currentPage === 1">قبلی</button>
      <span>صفحه {{ currentPage }} از {{ totalPages }}</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages">بعدی</button>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

h3 { margin: 0; color: #333; }

.search-input {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  font-family: Tahoma;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: right;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #f1f5f9;
}

th {
  cursor: pointer;
  color: #64748b;
  font-weight: bold;
}

th:hover { color: #4F46E5; }

.badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.badge.active { background: #dcfce7; color: #166534; }
.badge.inactive { background: #fee2e2; color: #991b1b; }

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
}

.pagination button {
  padding: 6px 16px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.pagination button:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}
</style>