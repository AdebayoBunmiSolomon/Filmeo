import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MovieCastSubComp from "./sub-components/Movie-Cast";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type movieCastProps = {
  movieCastData: any[];
  isError: boolean;
  loading: boolean;
};

export const MovieCast: React.FC<movieCastProps> = ({
  movieCastData,
  isError,
  loading,
}) => {
  const { theme } = useContext(ThemeContext);
  const navigation: NavigationProp<any> = useNavigation();

  const navigateToCastInformation = (id: number) => {
    navigation.navigate("CastInformation", {
      castId: id,
    });
  };

  return (
    <>
      <AppText fontSemibold sizeMedium black>
        Top Cast
      </AppText>
      {loading ? (
        <Loader
          sizes='small'
          color={theme === "dark" ? colors.primaryColor2 : colors.primaryColor}
        />
      ) : isError ? (
        <View style={styles.errorContainer}>
          <AppText fontRegular sizeSmall gray>
            Error loading movie casts
          </AppText>
        </View>
      ) : (
        <FlatList
          data={movieCastData}
          keyExtractor={(items, index) => items.id + index.toString()}
          renderItem={({ item, index }) => (
            <>
              <MovieCastSubComp
                item={item}
                index={index}
                onPress={() => navigateToCastInformation(item.id)}
              />
            </>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={2}
          initialNumToRender={2}
          windowSize={2}
          updateCellsBatchingPeriod={100}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
