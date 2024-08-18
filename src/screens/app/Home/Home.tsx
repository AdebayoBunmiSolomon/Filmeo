import React, { useEffect } from "react";
import { Screen } from "../../Screen";
import { Header } from "@src/components/shared";
import { BottomTabBarScreenProps } from "@src/router/Types";
import { TrendingMovies, UpcomingMovies } from "@src/components/app/home";
import { ScrollView, View } from "react-native";
import { verticalScale } from "@src/resources";
import { useGetGenre } from "@src/functions/api/services/movies";
import { Error, ListButton } from "@src/common";
import { usePushNotification } from "@src/hooks/state/usePushNotification";
import { useUserDataStore } from "@src/hooks/store";

export const Home = ({}: BottomTabBarScreenProps<"Home">) => {
  const { genreData, loading, getMovieGenres, isError } = useGetGenre();

  const { expoPushToken } = usePushNotification();
  // const { userData } = useUserDataStore();
  // console.log("Home", userData);

  //save push token to device and firestore
  useEffect(() => {
    if (expoPushToken) {
      console.log(expoPushToken);
    }
  }, [expoPushToken]);

  useEffect(() => {
    getMovieGenres();
  }, []);
  return (
    <Screen>
      <Header backHeader={false} title='Hi,' showUsername showRightIcon />
      {isError ? (
        <Error
          onRefresh={() => {
            getMovieGenres();
          }}
          errTitle='Error refreshing genre list'
          refreshBtnTitle='Click to refresh'
        />
      ) : (
        <>
          <ListButton
            setSelectedItem={(value) => {
              console.log(value);
            }}
            loading={loading}
            data={genreData}
            showHeaderTitle
            headerTitle='Genres'
          />
        </>
      )}
      {!loading && (
        <>
          <ScrollView
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <View
              style={{
                paddingBottom: verticalScale(75),
              }}>
              <TrendingMovies />
              <UpcomingMovies />
            </View>
          </ScrollView>
        </>
      )}
    </Screen>
  );
};
