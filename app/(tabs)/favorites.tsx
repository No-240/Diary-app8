import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import DiaryCard from "../../src/components/DiaryCard";
import { clearAllFavorites, toggleFavorite } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";
import { useMemo } from "react";

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const entries = useAppSelector((s) => s.diary.entries);
  const favoriteEntries = useMemo(() => entries.filter((e) => e.liked), [entries]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite</Text>
      <Text style={styles.counter}>
        {favoriteEntries.length}
        {" "}diary favorite
      </Text>

      {favoriteEntries.length > 0 && (
        <Pressable onPress={() => dispatch(clearAllFavorites())}>
          <Text style={{ color: COLORS.danger, fontWeight: "700" }}>Hapus semua favorite</Text>
        </Pressable>
      )}

      <FlatList
        data={favoriteEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={item.liked}
            onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
            onPress={() =>
              router.push({
                pathname: "/detail/[id]",
                params: { id: String(item.id) },
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada favorite.</Text>
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
  },
  counter: {
    color: COLORS.muted,
    marginBottom: SPACE.m,
  },
  empty: {
    textAlign: "center",
    color: COLORS.muted,
    marginTop: 40,
  },
});