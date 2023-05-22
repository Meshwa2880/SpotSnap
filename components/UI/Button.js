import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

const Button = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressesd]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  pressesd: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    paddingVertical: 8,
    margin: 4,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary800,
    color: Colors.primary50,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 },
    borderRadius: 4,
  },
});
