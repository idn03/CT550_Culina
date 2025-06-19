import React from 'react';
import { useCopilot } from "react-native-copilot";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Header, InriaTitle, NormalText, TextBold } from "@components/index";
import { spacings, shadow } from '@/utils/CulinaStyles';

const HelpScreen = () => {
    const { start } = useCopilot();
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Header>Help</Header>

            <View style={[styles.main, spacings.m8, shadow.boxShadow]}>
                <ScrollView style={{ flex: 1, ...spacings.m10 }} showsVerticalScrollIndicator={false}>
                    <InriaTitle>Home Screen</InriaTitle>
                    <NormalText>
                        The Home Screen is the main dashboard, where users can explore the
                        most updated recipes like a book cover from everyone. You can tap
                        on it to view the recipe's details, and then rate or save it to your
                        personal account.
                    </NormalText>
                    <Pressable onPress={() => {
                        navigation.navigate;
                        start();
                    }}>
                        <TextBold>Take a Tour</TextBold>
                    </Pressable>

                    <InriaTitle style={{ marginTop: 40 }}>Search Screen</InriaTitle>
                    <NormalText>
                        The Search Screen allows users to explore recipes based on title and ingredients.
                    </NormalText>

                    <InriaTitle style={{ marginTop: 40 }}>Add New Recipe Screen</InriaTitle>
                    <NormalText>
                        The Add New Recipe Screen enables users to create and submit their own
                        recipes. They can input details such as title, ingredients, preparation
                        steps, and upload images.
                    </NormalText>

                    <InriaTitle style={{ marginTop: 40 }}>Achievements Screen</InriaTitle>
                    <NormalText>
                        The Achievements Screen tracks the user's progress and milestones, rewarding
                        them for engagement and contributions. Users can compete with each other to
                        be in the Top 3 of the system.
                    </NormalText>

                    <InriaTitle style={{ marginTop: 40 }}>Account Screen</InriaTitle>
                    <NormalText>
                        The Account Screen is where users manage their personal profile, saved recipes,
                        and app settings. It also provides options for authentication and logout.
                    </NormalText>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        minHeight: '60%',
        backgroundColor: '#FFF5CD',
        borderRadius: 32,
    }
});

export default React.memo(HelpScreen);