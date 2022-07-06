import { TouchableOpacity } from "react-native";

const MainCard = ({
  navigation,
  item
}) => {
  largeOrSmall = () => {
    // Generate a random height 100-200
    const height = Math.floor(Math.random() * 100) + 100;
    return { height };
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Park Detail Screen', {
          park: item,
        });
      }
      }
      >
    <View style={styles.card}>
      <Image resizeMode="cover" source={{ uri: item.featured_image }} style={{
        width: '100%',
        height: largeOrSmall(),
      }} />
      <View style={styles.cardContent}>
        {/* Neighborhood */}
        <Text style={styles.neighborhood}>{item.neighborhood}</Text>
        <Text style={styles.cardTitle}>{item.name}</Text>
        
        <Text style={styles.checkin}>Number of dogs at park: {item.dogs ? Object.keys(item.dogs).length : 0}</Text>
        <Text style={styles.checkin}>Last check-in: {item.dogs ? moment(item.dogs[Object.keys(item.dogs)[0]].timestamp).format('MMMM Do YYYY, h:mm:ss a') : 'No check-ins yet'}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
}