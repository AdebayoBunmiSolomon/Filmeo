import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { useGetGenre } from "@src/functions/api/services";
import { layout } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

interface IGenreListProps {
  setSelectedGenre: React.Dispatch<SetStateAction<string>>;
}

export const GenreList: React.FC<IGenreListProps> = ({ setSelectedGenre }) => {
  const { theme } = useContext(ThemeContext);
  const { genreData, loading, getMovieGenres } = useGetGenre();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  useEffect(() => {
    getMovieGenres();
  }, []);
  return (
    <>
      {loading ? (
        <Loader
          sizes='small'
          color={theme === "dark" ? colors.primaryColor2 : colors.primaryColor}
        />
      ) : (
        <View style={styles.container}>
          <AppText fontSemibold sizeMedium gray>
            Genre
          </AppText>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {genreData.map((items, index: number) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedIndex(index);
                  setSelectedGenre(items.name);
                }}
                key={index}
                style={[
                  styles.genreButton,
                  {
                    backgroundColor:
                      theme === "light" && selectedIndex === index
                        ? colors.primaryColor2
                        : theme === "light" && selectedIndex !== index
                        ? colors.lightGray
                        : theme === "dark" && selectedIndex === index
                        ? colors.primaryColor
                        : theme === "dark" && selectedIndex !== index
                        ? colors.lightGray
                        : undefined,
                  },
                ]}>
                <AppText
                  fontRegular
                  style={{
                    color:
                      theme === "light" && selectedIndex === index
                        ? colors.white
                        : undefined,
                  }}>
                  {items.name}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: layout.size10,
    flexDirection: "column",
    gap: layout.size10,
  },
  genreButton: {
    paddingHorizontal: layout.size10,
    paddingVertical: layout.size10,
    marginRight: layout.size10,
    borderRadius: layout.size6,
  },
});
