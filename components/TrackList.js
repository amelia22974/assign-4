import { StyleSheet, Text, Image, View, FlatList} from "react-native";
import colors from "../Themes/colors";
import images from "../Themes/images";
import Song from "../components/Song";

export default function TrackList(props){

    const renderItem = (item, index) => (

        <Song item={item} index={index + 1}></Song>

      );


    return (
        <View style={styles.container}>
          <View style={styles.titleParent}>
            <View style={styles.titleChild}>
                <Image source={images.spotify} style={styles.logo}></Image>
            </View>
            <View style={styles.titleChild}>
                <Text style={styles.topTracksTitle}>My Top Tracks</Text>
            </View>

          </View>
          <View>
            <FlatList
                data={props.data} // the array of data that the FlatList displays
                renderItem={({item, index}) => renderItem(item, index)} // function that renders each item
                keyExtractor={(item) => item.id} // unique key for each item
            />
          </View>
          
        </View>
      );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  topTracksTitle: {
      fontWeight: "bold",
      fontSize: 20,
      color: "white"
  },
  logo: {
    height:20,
    width: 20,
    padding: '4%'
  },
  titleParent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: '5%'
  },
  titleChild:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});