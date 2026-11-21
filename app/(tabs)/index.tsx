import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import DiaryCard from "../../src/components/DiaryCard";
import { toggleFavorite } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";
import { useState } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const MOODS = ["😊", "😐", "😢", "😡"];
  const entries = useAppSelector((s) => s.diary.entries);
  const totalDiary = useAppSelector((s) => s.diary.entries.length);
  const totalFavorite = useAppSelector(
    (s) => s.diary.entries.filter((i) => i.liked).length
  );
  const [moodFilter, setMoodFilter] = useState<string | null>(null);
  const visibleEntries = moodFilter
    ? entries.filter((i) => i.mood === moodFilter)
    : entries;
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      <Text style={styles.counter}>
        Total Diary: {totalDiary} • Total Favorite: {totalFavorite}
      </Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        <Pressable onPress={() => setMoodFilter(null)}>
          <Text style={{ opacity: moodFilter === null ? 1 : 0.4 }}>Semua</Text>
        </Pressable>
        {MOODS.map((m) => (
          <Pressable key={m} onPress={() => setMoodFilter(m)}>
            <Text style={{ fontSize: 24, opacity: moodFilter === m ? 1 : 0.4 }}>{m}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={visibleEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={item.liked}
            onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
            onPress={() => router.push(`/detail/${item.id}` as any)}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: COLORS.muted, marginTop: 40 }}>
            {moodFilter
              ? "Tidak ada diary dengan mood ini."
              : "Belum ada diary. Buka tab Tambah untuk menulis diary pertamamu."}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
  },
  counter: {
    color: COLORS.muted,
    marginBottom: SPACE.m,
  },
});