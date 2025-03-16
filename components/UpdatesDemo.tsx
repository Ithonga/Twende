import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../colors/colors';

export default function UpdatesDemo() {
  const {
    currentlyRunning,
    isUpdateAvailable,
    isUpdatePending
  } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      // Update has successfully downloaded; apply it now
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  // If true, we show the button to download and run the update
  const showDownloadButton = isUpdateAvailable;

  // Show whether or not we are running embedded code or an update
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? 'Please download and run the update'
    : 'Your version of Twende app is running from an update';

  return (
    <View style={styles.container}>
      <Text style={styles.headerText} >Twende App</Text>
      <Text>{runTypeMessage}</Text>

      <TouchableOpacity onPress={() => Updates.checkForUpdateAsync()}>
        <Text style={{ padding: 10, backgroundColor: "#2e9dff", color: colors.WHITE, borderRadius: 8, margin: 10 }}>Check for updates</Text>
      </TouchableOpacity>
      {showDownloadButton ? (
        <TouchableOpacity onPress={() => Updates.fetchUpdateAsync()}>
          <Text style={{ padding: 10, backgroundColor: "#2e9dff", color: colors.WHITE, borderRadius: 8, margin: 10 }}>Download and run update</Text>
        </TouchableOpacity>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  headerText: {
    fontSize: 18,
    marginBottom: 20,
  },
})