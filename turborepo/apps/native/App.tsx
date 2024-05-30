import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { WebView } from "react-native-webview";

export default function Native() {
  const runFirst = `
  window.isNativeApp = true;
  true; // note: this is required, or you'll sometimes get silent failures
`;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <WebView
        style={styles.webview}
        source={{
          uri: "http://starge.vercel.app",
        }}
        onMessage={(event) => {}}
        injectedJavaScript={runFirst}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  webview: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
