import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Screen } from "../../../Screen";
import { AppText, Header } from "@src/components/shared";
import { DrawerStackScreenProps } from "@src/router/Types";
import { useGetMovieCertification } from "@src/functions/api/services/movies";
import { Loader } from "@src/components/core";
import { ThemeContext } from "@src/resources/Theme";
import { colors } from "@src/resources/Colors";
import { Error } from "@src/common";
import { CertificationHeader } from "@src/components/app/movie-certification";
import { ScrollView, StyleSheet, View, findNodeHandle } from "react-native";
import { DVW, moderateScale, verticalScale } from "@src/resources";
import Animated, { SlideInDown } from "react-native-reanimated";

export const MovieCertification =
  ({}: DrawerStackScreenProps<"MovieCertification">) => {
    const { loading, isError, displayCertifications, movieCertificationsData } =
      useGetMovieCertification();
    const { theme } = useContext(ThemeContext);
    const [btnIndex, setBtnIndex] = useState<number>(0);

    const scrollViewRef = useRef<ScrollView>(null);
    const itemRefs = useRef<RefObject<Animated.View>[]>([]);

    useEffect(() => {
      displayCertifications();
    }, []);

    useEffect(() => {
      if (
        btnIndex !== null &&
        itemRefs.current[btnIndex] &&
        scrollViewRef.current
      ) {
        const scrollViewHandle = findNodeHandle(scrollViewRef.current);
        if (scrollViewHandle) {
          setTimeout(() => {
            itemRefs.current[btnIndex]?.current?.measureLayout(
              scrollViewHandle,
              (y) => {
                scrollViewRef.current?.scrollTo({ y: y, animated: true });
              }
            );
          }, 100);
        }
      }
    }, [btnIndex]);

    const showCertifications = () => {
      return movieCertificationsData.map((countryCode, countryIndex) => (
        <View key={countryIndex}>
          <CertificationHeader
            headerTitle={countryCode.countryCode}
            onClick={() => setBtnIndex(countryIndex)}
            index={countryIndex}
            btnIndex={btnIndex}
          />
          {btnIndex === countryIndex &&
            movieCertificationsData[btnIndex].certifications.map(
              (items, itemIndex) => {
                const itemRef = React.createRef<Animated.View>();
                itemRefs.current[itemIndex] = itemRef;
                return (
                  <Animated.View
                    key={itemIndex}
                    entering={SlideInDown}
                    ref={itemRef}>
                    <View
                      style={[
                        styles.certificationItemContainer,
                        {
                          borderColor: colors.gray,
                        },
                      ]}>
                      <View style={styles.certificationItemHeader}>
                        <AppText fontSemibold sizeBody black>
                          Certification: {items.certification}
                        </AppText>
                      </View>
                      <AppText fontRegular sizeSmall gray>
                        {items.meaning}
                      </AppText>
                    </View>
                  </Animated.View>
                );
              }
            )}
        </View>
      ));
    };

    return (
      <Screen>
        <Header backHeader={true} title='Movie Certification' />
        {loading ? (
          <Loader
            sizes='large'
            color={
              theme === "dark" ? colors.primaryColor2 : colors.primaryColor
            }
          />
        ) : isError ? (
          <Error
            onRefresh={() => displayCertifications()}
            refreshBtnTitle='Reload Data'
            errTitle='Error loading movie certification'
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}>
            {showCertifications()}
          </ScrollView>
        )}
      </Screen>
    );
  };

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: verticalScale(20),
  },
  certificationItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  certificationItemContainer: {
    marginBottom: moderateScale(10),
    borderBottomWidth: DVW(0.3),
    paddingVertical: verticalScale(4),
  },
});
