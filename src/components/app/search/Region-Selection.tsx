import { AppText } from "@src/components/shared";
import { DVH, DVW, layout, moderateScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useState } from "react";
import { TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useGetAvailableRegions } from "@src/functions/api/services/regions";
import { Loader } from "@src/components/core";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type regionSelectionProps = {
  showSelection: boolean;
  setShowSelection: (value: boolean) => void;
  setSelectedItem: (value: string) => void;
};

export const RegionSelection: React.FC<regionSelectionProps> = ({
  showSelection,
  setSelectedItem,
  setShowSelection,
}) => {
  const { loading, loadMoreData, availableRegionData } =
    useGetAvailableRegions();
  const { theme } = useContext(ThemeContext);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <>
      {showSelection && (
        <Animated.FlatList
          entering={FadeIn}
          exiting={FadeOut}
          data={availableRegionData}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <Loader
                sizes='small'
                color={
                  theme === "dark" ? colors.primaryColor2 : colors.primaryColor
                }
              />
            ) : null
          }
          keyExtractor={(items, index) =>
            index.toString() + items.iso_3166_1.toString()
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedIndex(index);
                setSelectedItem(item.iso_3166_1);
                setShowSelection(!showSelection);
              }}
              style={[
                styles.container,
                {
                  borderColor: colors.gray,
                },
              ]}>
              <AppText fontRegular sizeBody>
                {item.iso_3166_1} &nbsp;&nbsp;&nbsp; {item.english_name}
              </AppText>
              {selectedIndex === index ? (
                <Feather
                  name='check'
                  color={colors.gray}
                  size={moderateScale(20)}
                />
              ) : null}
            </TouchableOpacity>
          )}
          style={[
            styles.flatListContainer,
            {
              backgroundColor: theme === "dark" ? colors.black : colors.white,
            },
          ]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    borderWidth: DVW(0.3),
    borderColor: colors.gray,
    borderRadius: moderateScale(5),
    position: "absolute",
    zIndex: 20,
    height: DVH(35),
    width: DVW(80.5),
    paddingVertical: layout.size10,
    paddingHorizontal: layout.size10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: layout.size6,
    marginBottom: layout.size10,
  },
});
