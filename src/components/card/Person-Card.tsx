import { IMAGE_BASE_URL } from "@env";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { AppButton, AppText } from "../shared";
import { useImageLoader } from "@src/hooks/state";
import { DVH, DVW, layout, moderateScale, verticalScale } from "@src/resources";
import { useSearchPeople } from "@src/functions/api/services/search";
import { calculateAge, getYearFromDateValue } from "@src/helper/helper";

type personCardProps = {
  items: any;
  index: number;
  viewMore: () => void;
};

export const PersonCard: React.FC<personCardProps> = ({
  items,
  index,
  viewMore,
}) => {
  const { imageLoading, handleImageLoadEnd, handleImageLoadStart } =
    useImageLoader();
  const { theme } = useContext(ThemeContext);
  const { getPersonData } = useSearchPeople();
  const [personData, setPersonData] = useState<any>();

  useEffect(() => {
    const loadPersonData = async () => {
      setPersonData(await getPersonData(items.id));
    };
    loadPersonData();
  }, []);

  return (
    <>
      <View style={styles.container} key={index}>
        <View
          style={{
            flexDirection: "row",
          }}>
          <View style={styles.imgContainer}>
            {imageLoading[index] && (
              <ActivityIndicator
                size='large'
                color={
                  theme === "dark" ? colors.primaryColor2 : colors.primaryColor
                }
                style={styles.loader}
              />
            )}
            <View>
              <Image
                source={
                  items.profile_path
                    ? { uri: `${IMAGE_BASE_URL}${items.profile_path}` }
                    : require("@src/assets/images/no-img.png")
                }
                resizeMode={items.profile_path ? "cover" : "center"}
                style={styles.img}
                onLoadStart={() => handleImageLoadStart(index)}
                onLoadEnd={() => handleImageLoadEnd(index)}
              />
            </View>
          </View>
          <View
            style={{
              gap: moderateScale(10),
              paddingTop: moderateScale(10),
            }}>
            <View>
              <AppText fontBold sizeSmall gray>
                Name:
              </AppText>
              <AppText fontSemibold sizeSmall>
                {personData && personData.name}
              </AppText>
            </View>
            <View>
              <AppText fontBold sizeSmall gray>
                Popularity:
              </AppText>
              <AppText fontSemibold sizeSmall>
                {personData && personData.popularity}
              </AppText>
            </View>
            <View>
              <AppText fontBold sizeSmall gray>
                Place of Birth:
              </AppText>
              <AppText
                fontSemibold
                sizeSmall
                style={{
                  flexWrap: "wrap",
                }}>
                {personData && personData.place_of_birth}
              </AppText>
            </View>
            <View>
              <AppText fontBold sizeSmall gray>
                Birthday:
              </AppText>
              <AppText
                fontSemibold
                sizeSmall
                style={{
                  flexWrap: "wrap",
                }}>
                {personData && personData.birthday}
              </AppText>
            </View>
            <View>
              <AppText fontBold sizeSmall gray>
                Age:
              </AppText>
              <AppText
                fontSemibold
                sizeSmall
                style={{
                  flexWrap: "wrap",
                }}>
                {personData &&
                  calculateAge(getYearFromDateValue(personData.birthday))}
              </AppText>
            </View>
          </View>
        </View>
        <AppButton
          title='View Profile'
          onPress={() => {
            viewMore();
          }}
          outline
          style={{
            marginTop: verticalScale(10),
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: layout.size10,
    marginRight: layout.size2,
    width: Platform.OS === "ios" ? DVW(91) : DVW(92),
    paddingHorizontal: DVW(2),
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  imgContainer: {
    borderRadius: layout.size16,
    width: Platform.OS === "ios" ? DVW(45) : DVW(46),
    height: DVH(30),
    overflow: "hidden",
    marginRight: layout.size4,
    borderWidth: DVW(0.2),
    borderColor: colors.gray,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: Platform.OS === "ios" ? DVW(45) : DVW(46),
    height: DVH(30),
  },
  likeButton: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: moderateScale(10),
  },
});
