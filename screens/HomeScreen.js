import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Appbar, TextInput, Button } from 'react-native-paper';
import { getFirestore, collection, addDoc, query, onSnapshot} from "firebase/firestore";

const HomeScreen = ({navigation}) => {
    const [todo, setTodo] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [todos, setTodos] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState(null); // Assuming you have a way to get the current user

    const firestore = getFirestore(); // Get Firestore instance
    const ref = collection(firestore, 'todos'); // Reference to the 'todos' collection

    // Function to add a new todo
    async function addTodo() {
        await addDoc(ref, {
            title: todo,
            complete: false,
        });
        setTodo('');
    }

    // Function to handle logout
    

    React.useEffect(() => {
        const unsubscribe = onSnapshot(query(ref), (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const { title, complete } = doc.data();
                list.push({
                    id: doc.id,
                    title,
                    complete,
                });
            });
            setTodos(list);
            if (loading) {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [loading]);

    if (loading) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style = {{paddingBottom:20}}><Appbar.Header>
                <Appbar.Action icon="logout" onPress={() => navigation.navigate('Login')} />
            </Appbar.Header></View>

            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <TextInput style={{ backgroundColor: "white", width: "80%" }} value={todo} onChangeText={text => setTodo(text)} placeholder="Add new .." />
                <Button onPress={addTodo} style={styles.button}><Text style={styles.buttontext}> Add </Text></Button>
            </View>
            <FlatList data={todos} renderItem={({ item }) => (
                <View>
                    <Text style={styles.todoItem}>{item.title}</Text>
                </View>
            )} />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    button: {
        backgroundColor: '#007bff',
        width: 'auto',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginLeft: 5,
    },
    buttontext: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    todoItem: {
        fontSize: 15,
        paddingTop: 20,
    },
});
