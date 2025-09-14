import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TaskItem from '../src/components/TaskItem';
import { dummyTasks } from '../src/data/dummyTasks';

export default function HomeScreen() {
  const [tasks, setTasks] = useState(dummyTasks);
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const handleToggle = (task) => {
    setTasks(prev =>
      prev.map(t => t.id === task.id
        ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
        : t
      )
    );
  };

  // filter tasks berdasarkan status + kategori
  const filteredTasks = tasks.filter(t => {
    const statusMatch =
      statusFilter === 'All' ||
      (statusFilter === 'Todo' && t.status === 'pending') ||
      (statusFilter === 'Done' && t.status === 'done');

    const categoryMatch =
      categoryFilter === 'All' || t.category === categoryFilter;

    return statusMatch && categoryMatch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>TaskMate – Daftar Tugas</Text>

      {/* Filter Status */}
      <View style={styles.filterRow}>
        {['All', 'Todo', 'Done'].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, statusFilter === f && styles.filterActive]}
            onPress={() => setStatusFilter(f)}
          >
            <Text style={[styles.filterText, statusFilter === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filter Kategori */}
      <View style={styles.filterRow}>
        {['All', 'Mobile', 'RPL', 'IoT'].map(c => (
          <TouchableOpacity
            key={c}
            style={[styles.filterButton, categoryFilter === c && styles.filterActive]}
            onPress={() => setCategoryFilter(c)}
          >
            <Text style={[styles.filterText, categoryFilter === c && styles.filterTextActive]}>
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { fontSize: 20, fontWeight: '700', padding: 16 },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 4,
  },
  filterActive: { backgroundColor: '#3b82f6' },
  filterText: { fontWeight: '600', color: '#334155' },
  filterTextActive: { color: '#fff' },
});
