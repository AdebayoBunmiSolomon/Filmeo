import React, { useContext, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { DVH, DVW, moderateScale, verticalScale } from "@src/resources";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { AppText } from "@src/components/shared";
import YoutubePlayer from "react-native-youtube-iframe";

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

      <Modal
        animationType='fade'
        transparent={true}
        visible={visible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View
          style={[
            styles.innerModalContainer,
            {
              backgroundColor:
                theme === "dark" ? colors.modalBg : colors.modalBg,
            },
          ]}>
          <TouchableOpacity
            style={[
              styles.closeBtn,
              {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(56, 53, 53, 0.26)"
                    : "rgba(0, 0, 0, 0.162)",
              },
            ]}
            onPress={() => setVisible(!visible)}>
            <AppText
              fontSemibold
              sizeMedium
              style={{
                color: colors.white,
              }}>
              X
            </AppText>
          </TouchableOpacity>
          <View style={styles.youTubeContent}>
            <YoutubePlayer
              height={300}
              width={DVW(95)}
              play={true}
              videoId={videoKey}
            />
          </View>
        </View>
      </Modal>
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
  innerModalContainer: {
    width: "100%",
    height: "100%",
    paddingTop: verticalScale(30),
    paddingHorizontal: moderateScale(10),
  },
  closeBtn: {
    width: DVW(10),
    height: DVH(5),
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  youTubeContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
