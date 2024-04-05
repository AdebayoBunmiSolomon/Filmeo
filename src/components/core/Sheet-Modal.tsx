import "react-native-gesture-handler";
import React, { useContext } from "react";
import { StyleSheet, Pressable, View, ScrollView } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  withTiming,
  SlideInDown,
  SlideOutDown,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { DVW, layout, screenHeight, screenWidth } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import { AppText } from "../shared";

type sheetModalProps = {
  visible: boolean;
  setVisible: (value: React.SetStateAction<boolean>) => void;
  snapPointHeight: number;
};

const data = [
  "#782AEB",
  "#38ACDD",
  "#57B495",
  "#FF6259",
  "#FFD61E",
  "#82CAB2",
  "#B58DF1",
  "#E9DBFF",
  "#D7F0FA",
  "#D3F5E4",
  "#FFDCDB",
  "#FFF9DB",
  "#DFF2EC",
  "#F5EEFF",
];

const OVERDRAG = 20;
const BACKGROUND_COLOR = "#F8F9FF";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const SheetModal: React.FC<sheetModalProps> = ({
  visible,
  setVisible,
  snapPointHeight,
}) => {
  const { theme } = useContext(ThemeContext);
  const offset = useSharedValue(0);
  const HEIGHT = screenHeight / snapPointHeight;

  const toggleSheet = () => {
    setVisible(!visible);
    offset.value = 0;
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-OVERDRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(HEIGHT, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <>
      {visible && (
        <>
          <AnimatedPressable
            style={[
              styles.backdrop,
              {
                backgroundColor: colors.modalBg,
              },
            ]}
            entering={FadeIn}
            exiting={FadeOut}
            onPress={toggleSheet}
          />
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[
                styles.sheet,
                translateY,
                {
                  backgroundColor:
                    theme === "dark" ? colors.black : colors.white,
                  height: HEIGHT,
                },
              ]}
              entering={SlideInDown.springify().damping(15)}
              exiting={SlideOutDown}>
              <View style={styles.draggableIndicator} />
              <View
                style={{
                  width: screenWidth,
                  height: "100%",
                  backgroundColor: "red",
                }}>
                <ScrollView
                  contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: "green",
                  }}>
                  {data &&
                    data.map((items, index) => (
                      <AppText
                        key={index}
                        fontRegular
                        sizeMedium
                        gray
                        style={{
                          colors: items,
                          padding: layout.size20,
                        }}>
                        {items}
                      </AppText>
                    ))}
                </ScrollView>
              </View>
            </Animated.View>
          </GestureDetector>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  sheet: {
    padding: 16,
    width: "100%",
    position: "absolute",
    bottom: -OVERDRAG * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  draggableIndicator: {
    borderWidth: DVW(0.5),
    backgroundColor: "darkgray",
    borderColor: "darkgray",
    borderRadius: layout.size6,
    width: DVW(16),
    alignSelf: "center",
  },
});
