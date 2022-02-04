import { StyleSheet, Text, Image, View, Dimensions} from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import colors from "../Themes/colors";
import millisToMinuteSeconds from "../utils/millisToMinuteSeconds";
import { isRequired } from "react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType";

export default function Song(props){
    return(
        <View style={styles.trackParent}>
            <View style={styles.trackChild}>
                <Text style={{color: "white"}}>{props.index}</Text>
            </View>
            <View style={styles.trackChild}>
                <Image style={styles.tinyLogo} source={ {uri: props.item.album.images[0].url}  }></Image>
            </View>
            <View style={styles.trackChild}>
                <View style={styles.albumParent}>
                    <View style={styles.albumChild}>
                        <Text numberOfLines={1} style={styles.normTextLong}>{props.item.album.name}</Text>
                    </View>
                    <View style={styles.albumChild}>
                        <Text numberOfLines={1} style={styles.normTextLong}>{props.item.album.artists[0].name}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.trackChild}>
                <Text numberOfLines={1} style={styles.normTextLong}>{props.item.name}</Text>
            </View>
            <View style={styles.trackChild}>
                <Text style={styles.normText}>{millisToMinuteSeconds(props.item.duration_ms)}</Text>
            </View>
                
        </View>
   )
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    trackChild: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 10
    },
    trackParent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    tinyLogo: {
        width: 40,
        height: 40
    },
    normText: {
        color: "white",
        width: windowWidth
    },
    normTextLong: {
        color: "white",
        width: windowWidth * 0.25
    },
    albumParent:{

    },
    albumChild: {

    }
});


