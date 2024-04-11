import { AuthScreenProps } from "@src/router/Types";
import React, { useRef, useState } from "react";
import { Screen } from "../Screen";
import { AppButton } from "@src/components/shared";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { onboardingScreenSlides } from "@src/constant/data";
import { DVH, DVW, layout, screenHeight, screenWidth } from "@src/resources";
import { Slide } from "@src/components/auth";
import { colors } from "@src/resources/Colors";

export const Onboarding = ({ navigation }: AuthScreenProps<"Onboarding">) => {
  const [currSlideIndex, setCurrSlideIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const nextSlide = () => {
    const nextSlideIndex = currSlideIndex + 1;
    if (nextSlideIndex !== onboardingScreenSlides.length) {
      const offset = nextSlideIndex * (screenWidth - 30);
      flatListRef?.current?.scrollToOffset({ offset });
      setCurrSlideIndex(nextSlideIndex);
    }
  };

  const prevSlide = () => {
    const prevSlideIndex = currSlideIndex - 1;
    if (prevSlideIndex >= 0) {
      const offset = prevSlideIndex * (screenWidth - 30);
      flatListRef?.current?.scrollToOffset({ offset });
      setCurrSlideIndex(prevSlideIndex);
    }
  };

  const updateMomentScrollToEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const currentOffsetX = e.nativeEvent.contentOffset.x;
    const currIndex = Math.round(currentOffsetX / screenWidth);
    setCurrSlideIndex(currIndex);
  };

  return (
    <>
      <Screen>
        <View>
          <FlatList
            ref={flatListRef}
            onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
              updateMomentScrollToEnd(e)
            }
            pagingEnabled
            data={onboardingScreenSlides}
            contentContainerStyle={styles.slideListContainer}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <Slide data={item} />}
          />
        </View>
        <View style={styles.indicatorContainer}>
          {onboardingScreenSlides &&
            onboardingScreenSlides.map((items, index) => (
              <View
                style={[
                  styles.indicator,
                  {
                    backgroundColor:
                      currSlideIndex === index
                        ? colors.primaryColor
                        : colors.gray,
                    width: currSlideIndex === index ? DVW(8) : DVW(4),
                  },
                ]}
                key={index}
              />
            ))}
        </View>
        <View style={styles.footer}>
          {currSlideIndex === onboardingScreenSlides.length - 1 ? (
            <AppButton
              title='Get Started'
              onPress={() => navigation.navigate("GetStarted")}
            />
          ) : (
            <>
              <AppButton
                title='Prev'
                style={{
                  width: DVW(40),
                }}
                onPress={() => prevSlide()}
                outline
              />
              <AppButton
                title='Next'
                style={{
                  width: DVW(40),
                }}
                onPress={() => nextSlide()}
              />
            </>
          )}
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  slideListContainer: {
    height: screenHeight * 0.75,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: layout.size4,
    // marginTop: DVH(-45),
  },
  indicator: {
    height: DVH(0.5),
    width: DVW(4),
    marginHorizontal: layout.size2,
    borderRadius: layout.size4,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: layout.size16,
    paddingTop: layout.size57,
  },
});
