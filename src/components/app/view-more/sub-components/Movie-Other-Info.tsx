import { AppText } from "@src/components/shared";
import { verticalScale } from "@src/resources";
import { colors } from "@src/resources/Colors";
import { ThemeContext } from "@src/resources/Theme";
import React, { useContext } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { DataTable } from "react-native-paper";

type movieOtherInfoProps = {
  numberOfSeasons: any;
  numberOfEpisodes: any;
  productionCountries: any[];
  spokenLanguages: any[];
};

export const MovieOtherInfo: React.FC<movieOtherInfoProps> = ({
  numberOfSeasons,
  numberOfEpisodes,
  productionCountries,
  spokenLanguages,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        marginBottom:
          Platform.OS === "ios" ? verticalScale(10) : verticalScale(15),
        marginTop: verticalScale(10),
      }}>
      <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Seasons</DataTable.Title>
          <DataTable.Title>Episodes</DataTable.Title>
          <DataTable.Title>Prod. Countries</DataTable.Title>
          <DataTable.Title>Spoken Lang.</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell style={styles.cell}>
            <AppText fontRegular black sizeSmall style={styles.text}>
              {numberOfSeasons}
            </AppText>
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>
            <AppText fontRegular black sizeSmall style={styles.text}>
              {numberOfEpisodes}
            </AppText>
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>
            {productionCountries &&
              productionCountries.map((items, index) => (
                <AppText
                  key={index}
                  fontRegular
                  black
                  sizeSmall
                  style={styles.text}>
                  {items.name}
                  {index === productionCountries.length - 1 ? "" : ", "}
                </AppText>
              ))}
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>
            {spokenLanguages &&
              spokenLanguages.map((items, index) => (
                <AppText
                  key={index}
                  fontRegular
                  black
                  sizeSmall
                  style={styles.text}>
                  {items.name}
                  {index === spokenLanguages.length - 1 ? "" : ", "}
                </AppText>
              ))}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: "center", // Centers the text vertically
  },
  text: {
    flex: 1,
    flexWrap: "wrap", // Ensures the text wraps within the cell
  },
  tableHeader: {
    backgroundColor: colors.lightGray, // Optional: Add a background color for the header
  },
});
