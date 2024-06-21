import { Loader } from "@src/components/core";
import { AppText } from "@src/components/shared";
import { layout } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { SetStateAction, useContext, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

interface IListButtonProps {
  setSelectedItem: (value: string) => void;
  data: any;
  loading?: boolean;
  showHeaderTitle?: boolean;
  headerTitle?: string;
}

export const ListButton: React.FC<IListButtonProps> = ({
  setSelectedItem,
  loading,
  data,
  showHeaderTitle,
  headerTitle,
}) => {
  const { theme } = useContext(ThemeContext);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <>
      {showHeaderTitle && (
        <AppText fontSemibold sizeMedium gray style={styles.topText}>
          {headerTitle && headerTitle}
        </AppText>
      )}
      {loading ? (
        <Loader
          sizes='small'
          color={theme === "dark" ? colors.primaryColor2 : colors.primaryColor}
        />
      ) : (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {data &&
              data.map((items: any, index: number) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedIndex(index);
                    setSelectedItem(items.name);
                  }}
                  key={index}
                  style={[
                    styles.genreButton,
                    {
                      backgroundColor:
                        theme === "light" && selectedIndex === index
                          ? colors.primaryColor2
                          : theme === "light" && selectedIndex !== index
                          ? colors.lightGray
                          : theme === "dark" && selectedIndex === index
                          ? colors.primaryColor
                          : theme === "dark" && selectedIndex !== index
                          ? colors.lightGray
                          : undefined,
                    },
                  ]}>
                  <AppText
                    fontRegular
                    style={{
                      color:
                        theme === "light" && selectedIndex === index
                          ? colors.white
                          : undefined,
                    }}>
                    {items.name}
                  </AppText>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  topText: {
    marginTop: layout.size10,
    marginBottom: layout.size4,
  },
  container: {
    flexDirection: "column",
    gap: layout.size10,
    paddingBottom: layout.size10,
  },
  genreButton: {
    paddingHorizontal: layout.size10,
    paddingVertical: layout.size10,
    marginRight: layout.size10,
    borderRadius: layout.size6,
  },
});
