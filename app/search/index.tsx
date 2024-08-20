import { Button, Layout, Text } from "@ui-kitten/components";

export default function SearchScreen({ navigation }: any) {
    return (
        <Layout>
            <Button onPress={() => navigation.navigate('Search') }>Search</Button>
            <Button onPress={() => navigation.navigate('Home') } >Home</Button>
            
            <Text>Search</Text>
        </Layout>
    )
}