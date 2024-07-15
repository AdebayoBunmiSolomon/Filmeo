import { moderateScale } from "@src/resources";
import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "../shared";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useSharing } from "./services";

type countNShareProps = {
  item: any;
};

export const CountNShare: React.FC<countNShareProps> = ({ item }) => {
  const { shareFeature } = useSharing();
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: moderateScale(5),
      }}>
      <AppText fontRegular sizeBody gray>
        Vote Count:
      </AppText>
      <AntDesign
        name='like2'
        color={theme === "dark" ? colors.primaryColor2 : colors.primaryColor}
        size={moderateScale(20)}
      />
      <AppText fontBold mainColor>
        |
      </AppText>
      <AppText fontRegular mainColor>
        {item.vote_count}
      </AppText>
      <TouchableOpacity
        style={{
          paddingHorizontal: moderateScale(10),
        }}
        onPress={() => shareFeature(item.homepage)}>
        <FontAwesome
          name='share-alt'
          color={theme === "dark" ? colors.primaryColor2 : colors.primaryColor}
          size={moderateScale(22)}
        />
      </TouchableOpacity>
    </View>
  );
};
