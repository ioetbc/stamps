import {Button, StyleSheet, Text, View} from "react-native";
import {BarCodeScanner, PermissionStatus} from "expo-barcode-scanner";
import {useRouter} from "expo-router";
import {useContext, useEffect, useState} from "react";
import {collection, doc, increment, updateDoc} from "firebase/firestore";
import {db} from "../firebase-config";
import {AuthenticationContext} from "../context/auth-context";

export default function Scan() {
  const {user} = useContext(AuthenticationContext);
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({data: merchant}) => {
    setScanned(true);

    const userDocRef = doc(db, "users", user.uid);
    const merchantDocRef = doc(collection(userDocRef, "merchants"), merchant);

    try {
      await updateDoc(merchantDocRef, {
        count: increment(1),
      });
    } catch (e) {
      console.log("error updating document", e);
    }
    router.back();
  };

  if (hasPermission === PermissionStatus.UNDETERMINED) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === PermissionStatus.DENIED) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>this is the scan screen</Text>
      <Button onPress={() => router.back()} title="go back" />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
