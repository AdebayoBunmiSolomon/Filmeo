import { AppText } from "@src/components/shared";
import { adultSelection } from "@src/constant/data";
import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { DVW, layout, moderateScale, verticalScale } from "@src/resources";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type adultSelectionProps = {
  showSelection: boolean;
  setShowSelection: (value: boolean) => void;
  setSelectedItem: (value: string) => void;
};

export const AdultSelection: React.FC<adultSelectionProps> = ({
  showSelection,
  setSelectedItem,
  setShowSelection,
}) => {
  const { theme } = useContext(ThemeContext);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <>
      {showSelection && (
        <Animated.FlatList
          entering={FadeIn}
          exiting={FadeOut}
          style={[
            styles.flatListContainer,
            {
              backgroundColor: theme === "dark" ? colors.black : colors.white,
            },
          ]}
          data={adultSelection}
          keyExtractor={(items, index) => index.toString() + items.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedIndex(index);
                setSelectedItem(item.title);
                setShowSelection(!showSelection);
              }}
              style={[
                styles.container,
                {
                  borderColor: colors.gray,
                },
              ]}>
              <AppText fontRegular sizeBody>
                {item.title}
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
    marginTop: verticalScale(-10),
    position: "absolute",
    zIndex: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: layout.size6,
    width: DVW(80.5),
  },
});
