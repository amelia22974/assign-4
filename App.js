import { StyleSheet, Text, SafeAreaView, Pressable, Image, View} from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import colors from "./Themes/colors";
import images from "./Themes/images";
import TrackList from "./components/TrackList";


// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};



export default function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      // TODO: Select which option you want: Top Tracks or Album Tracks

      // Comment out the one you are not using
      myTopTracks(setTracks, token);
      albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);


  const SpotifyButton = () => {
    return(<Pressable style={styles.spotify_button} onPress={promptAsync}>
        <View style={styles.buttonParent}>
            <View style={styles.buttonChild}>
                <Image source={images.spotify} style={styles.logo}></Image>
            </View>
            <View style={styles.buttonChild}>
                <Text style={styles.logo_text}>    CONNECT WITH SPOTIFY</Text>
            </View>
        </View>
    </Pressable>);
  }

  let contentDisplayed = null;
  if (token) {
    console.log(tracks)
    contentDisplayed = <TrackList data={tracks}/>
  } else {
    contentDisplayed = <SpotifyButton promptAsync={promptAsync}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    buttonChild: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
  },
  buttonParent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
  },
  container: {
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  spotify_button: {
      backgroundColor: colors.spotify,
      padding: '3%',
      borderRadius: 9999
  },
  logo: {
      height:20,
      width: 20
  },
  logo_text: {
      color: "white",
      fontWeight: "bold"
  }
});
