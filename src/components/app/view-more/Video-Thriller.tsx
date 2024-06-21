import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DVH, DVW, moderateScale, verticalScale } from "@src/resources";
import YoutubePlayer from "react-native-youtube-iframe";
import { PageModal } from "@src/common";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";

type videoThrillerProps = {
  videoKey: string;
};

export const VideoThriller: React.FC<videoThrillerProps> = ({ videoKey }) => {
  const { theme } = useContext(ThemeContext);
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity
        style={[
          styles.youtubeBtn,
          {
            backgroundColor: colors.danger,
            borderColor: theme === "dark" ? colors.white : colors.gray,
          },
        ]}
        onPress={() => setVisible(!visible)}>
        <FontAwesome6
          name='play-circle'
          size={moderateScale(30)}
          color={theme === "dark" ? colors.gray : colors.white}
        />
      </TouchableOpacity>
      <PageModal visible={visible} setVisible={setVisible}>
        <View style={styles.youTubeContent}>
          <YoutubePlayer
            height={300}
            width={DVW(95)}
            play={true}
            videoId={videoKey}
          />
        </View>
      </PageModal>
    </>
  );
};

const styles = StyleSheet.create({
  youtubeBtn: {
    width: DVW(18),
    height: DVH(9),
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: verticalScale(100),
    right: moderateScale(10),
    borderWidth: DVW(0.5),
  },
  youTubeContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
