import { Button, Input, Layout, Text } from "@ui-kitten/components";

export default function HomeScreen({ navigation }) {
    return (
        <Layout>

            <form>
                <Layout style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Input placeholder='Search' />
                    <Button status='primary'>Search</Button>
                    <Button status='primary'>Carrinho</Button>
                </Layout> 
            </form>

            


            <Layout style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button onPress={() => navigation.navigate('search') }>Search</Button>
                <Button onPress={() => navigation.navigate('home') } >Home</Button>
            </Layout>
        </Layout>
    )
}