import { Button, Layout, Text } from "@ui-kitten/components";

export default function SearchScreen({ navigation}) {
    return (
        <Layout>
            <Button onPress={() => navigation.navigate('search') }>Search</Button>
            <Button onPress={() => navigation.navigate('home') } >Home</Button>
            
            <Text>Search</Text>
        </Layout>
    )
}