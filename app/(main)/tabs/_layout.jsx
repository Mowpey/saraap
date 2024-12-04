import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TabLayout() {
  return (
    <Tabs
     
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({focused }) => (
            <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} color={'#130E40'} size={28} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: '',
          tabBarIcon: ({focused }) => (
            <MaterialCommunityIcons name={focused ? 'shopping' : 'shopping-outline'}  color={'#130E40'} size={25}/>
          ),
          headerShown: false,
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({focused }) => (
            <FontAwesome name={focused ? 'user' : 'user-o'}  color={'#130E40'}  size={25}/>
          ),
          headerShown: false,
        }}
      />
      
    </Tabs>
    
  );
}
