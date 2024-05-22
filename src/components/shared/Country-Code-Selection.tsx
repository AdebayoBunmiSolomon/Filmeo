import React, { useContext } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { colors } from "@src/resources/Colors";
import { layout, moderateScale } from "@src/resources";
import { ThemeContext } from "@src/resources/Theme";
import { truncateText } from "@src/helper/helper";
import { useCountryCodeSelection, useSelectedCountry } from "@src/hooks/state";
import { Loader } from "../core/Loader";
import { AppInput, AppText } from ".";

type countryCodeSelectionProps = {
  closeModal: () => void;
  onSelectedCountry: (code: string, flag: string, name: string) => void;
};

export const CountryCodeSelection: React.FC<countryCodeSelectionProps> = ({
  closeModal,
  onSelectedCountry,
}) => {
  const { theme } = useContext(ThemeContext);
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();
  const { isLoading, data, handleLoadMore, searchValue, setSearchValue } =
    useCountryCodeSelection();

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <Loader
        sizes='small'
        color={theme === "dark" ? colors.primaryColor : colors.primaryColor2}
      />
    );
  };

  const onPressSelectedCountryItem = (
    flag: string,
    code: string,
    name: string
  ) => {
    setSelectedCountry({
      ...selectedCountry,
      flag: flag,
      dial_code: code,
      name: name,
    });
    onSelectedCountry(code, flag, name);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <AppText fontSemibold sizeLarge>
            Select Country
          </AppText>
          <TouchableOpacity onPress={closeModal}>
            <Ionicons
              name='close-circle-outline'
              color={theme === "dark" ? colors.white : colors.black}
              size={moderateScale(25)}
            />
          </TouchableOpacity>
        </View>
        <AppInput
          searchInput
          placeholder='search country'
          label=''
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          onSubmitEditing={() => console.log(searchValue)}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              onPressSelectedCountryItem(item.flag, item.dial_code, item.name);
            }}>
            <View style={styles.flagCountryContainer}>
              <AppText sizeXtraLarge>{item.flag}</AppText>
              <AppText sizeBody fontRegular>
                {item.dial_code}
              </AppText>
              <AppText fontRegular sizeMedium>
                {truncateText(String(item.name))}
              </AppText>
            </View>
            <AntDesign
              name={`${
                selectedCountry.name === item.name
                  ? "checkcircle"
                  : "checkcircleo"
              }`}
              size={layout.size20}
              color={`${
                selectedCountry.name === item.name
                  ? colors.primaryColor
                  : colors.gray
              }`}
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    gap: layout.size10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: layout.size10,
    paddingVertical: moderateScale(10),
  },
  flagCountryContainer: {
    flexDirection: "row",
    gap: layout.size6,
    alignItems: "center",
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
