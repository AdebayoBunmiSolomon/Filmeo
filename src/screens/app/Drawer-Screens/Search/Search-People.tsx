import React from "react";
import { Screen } from "../../../Screen";
import { AppButton, AppInput, AppText, Header } from "@src/components/shared";
import { DrawerStackScreenProps } from "@src/router/Types";
import { DVH, DVW, moderateScale, verticalScale } from "@src/resources";
import { Image, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@src/resources/Colors";
import { Controller, useForm } from "react-hook-form";
import { searchKeywordType } from "@src/form/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchKeywordSchema } from "@src/form/validation";
// import { GetRequest } from "@src/api/request";
// import { endpoint } from "@src/api/endpoints/endpoints";
// import { header } from "@src/api/configuration/header";
// import { upcomingMoviesDataType } from "@src/functions/api/store";
// import { useNextPrev } from "@src/hooks/state";

export const SearchPeople = ({
  navigation,
}: DrawerStackScreenProps<"SearchPeople">) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<searchKeywordType>({
    mode: "onChange",
    resolver: yupResolver(searchKeywordSchema),
  });
  // const [data, setData] = useState<upcomingMoviesDataType>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const { pageNumber, setPageNumber } = useNextPrev();
  // const [isError, setIsError] = useState<boolean>(false);

  // const fetchData = async (pageNum: number) => {
  //   setLoading(true);
  //   setIsError(false);
  //   try {
  //     const { status, data } = await GetRequest(
  //       `${endpoint.GET_UPCOMING_MOVIES}${pageNum}`,
  //       header,
  //       {}
  //     );
  //     setLoading(true);
  //     setIsError(false);
  //     const result = data.results;
  //     if (status === 200) {
  //       setData((prevData: upcomingMoviesDataType) => [...prevData, ...result]);
  //       setLoading(false);
  //     } else {
  //       console.log("Error fetching remaining data");
  //       setIsError(true);
  //     }
  //   } catch (err: any) {
  //     console.log("Error", err);
  //     setIsError(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData(pageNumber);
  // }, [pageNumber]);

  const onSubmit = async (data: searchKeywordType) => {
    if (data) {
      console.log("Keyword entered successfully");
    }
  };
  return (
    <Screen>
      <Header title='Search People' backHeader />
      <Controller
        control={control}
        render={({ field }) => (
          <AppInput
            searchInput
            placeholder='search keyword here'
            label=''
            error={errors?.keyword?.message}
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
        name='keyword'
        defaultValue=''
      />
      <AppButton
        title='Search'
        onPress={handleSubmit(onSubmit)}
        rightIcon={
          <FontAwesome
            name='search'
            size={moderateScale(15)}
            color={colors.white}
          />
        }
      />

      <View style={styles.textContainer}>
        <Image
          source={require("@src/assets/icons/rocket.png")}
          style={{
            height: DVH(30),
            width: DVW(30),
          }}
          resizeMode='contain'
        />
        <AppText
          fontRegular
          sizeMedium
          gray
          style={{
            maxWidth: DVW(80),
            textAlign: "center",
          }}>
          This feature is currently under development. Stay tuned for updates!
        </AppText>
        <AppButton title='Ok' onPress={() => navigation.goBack()} />
      </View>

      {/* <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <MovieCard items={item} index={index} viewMore={() => {}} />
        )}
        keyExtractor={(item, index) => index.toString() + item.id.toString()}
        onEndReached={() =>
          !loading && setPageNumber((prevPage: number) => prevPage + 1)
        }
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <Loader sizes='large' color={colors.primaryColor} /> : null
        }
        initialNumToRender={2}
        maxToRenderPerBatch={5}
      /> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: verticalScale(10),
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(20),
  },
});
