import { useState } from 'react';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { ChatTeardropText,SignOut } from 'phosphor-react-native';

import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";

import Logo from '../assets/logo.svg';

export function Home(){
    const { colors } = useTheme();

    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [ orders, setOrders] = useState<OrderProps[]>([{
        id: '123',
        patrimony: '123456',
        when: '18/07/2022',
        status:'open'
    }]);

    const navigation = useNavigation();

    function handleNewOrder(){
        navigation.navigate('new');
    }

    function openDetails(orderId: string){
        navigation.navigate('details', { orderId});
    }

    return (
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={16}
                pb={5}
                px={6}
            >
             <Logo />
             <IconButton 
                icon={<SignOut size={26} color={colors.gray[300]}/>}
             />
            </HStack>

            <VStack flex={1} px={6}>
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100">
                        Meus Chamados
                    </Heading>
                    <Text color="gray.200">
                        {orders.length}
                    </Text>

                    
                </HStack>
                <HStack space={3} mb={8}>
                    <Filter 
                        title="em andamento" 
                        type={"open"} 
                        isActive={statusSelected === "open"} 
                        onPress={ () => setStatusSelected("open")}
                    />
                    <Filter 
                        title="finalizados" 
                        type={"closed"} 
                        isActive={statusSelected === "closed"} 
                        onPress={ () => setStatusSelected("closed")}
                    />
                </HStack>
                <FlatList
                    data={orders}
                    keyExtractor={ item => item.id}
                    renderItem={ ({item}) => <Order data={item} onPress={() => openDetails(item.id)} />}
                    contentContainerStyle={{ paddingBottom: 100}}
                    ListEmptyComponent={() => (
                        <Center>
                             <ChatTeardropText color={colors.gray[300]} size={40}/>
                             <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                Você ainda não possui {'\n'}
                                solicitações { statusSelected === 'open'? 'em aberto' : 'fechadas'}
                             </Text>
                        </Center>
                    )}
                >

                </FlatList>
                <Button title="Nova solicitação" onPress={handleNewOrder}/>
            </VStack>
            
        </VStack>
    )
}