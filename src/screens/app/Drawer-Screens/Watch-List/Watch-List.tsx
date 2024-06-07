import React, { useContext, useEffect } from "react";
import { Screen } from "../../../Screen";
import { FlatList, StyleSheet, View } from "react-native";
import { AppText, Header } from "@src/components/shared";
import { DrawerStackScreenProps } from "@src/router/Types";
import { WatchListCard } from "@src/components/card";
import { verticalScale } from "@src/resources";
import { useWatchList } from "@src/functions/hooks/services";
import { Loader } from "@src/components/core";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { useIsFocused } from "@react-navigation/native";

export const WatchList = ({}: DrawerStackScreenProps<"WatchList">) => {
  const isFocused = useIsFocused();
  const { loading, watchList, getWatchList, removeFromWatchList } =
    useWatchList();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getWatchList();
  }, [isFocused]);
  return (
    <Screen>
      <Header backHeader={true} title='Watch List' />
      <View style={styles.container}>
        {loading ? (
          <Loader
            sizes='large'
            color={
              theme === "dark" ? colors.primaryColor2 : colors.primaryColor
            }
          />
        ) : watchList && watchList.length > 0 ? (
          <FlatList
            data={watchList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <WatchListCard
                items={item}
                key={index}
                removeItem={() => removeFromWatchList(Number(item.id))}
                loading={loading}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyWatchListContainer}>
            <AppText fontRegular gray sizeBody>
              You don't have any watch list yet 😓
            </AppText>
          </View>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(50),
    flex: 1,
  },
  emptyWatchListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
