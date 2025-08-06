import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Pressable, TextInput, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
    SimplePost,
    KuraleTitle,
    NormalText,
    InriaTitle
} from '@/components';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SimpleRecipe } from '@/interfaces/recipe';
import { createReport } from '@/services/api/reports';
import { spacings, shadow } from '@/utils/CulinaStyles';
import { ReportForm } from '@/interfaces/reports';

interface ReportModalProps {
    recipe: SimpleRecipe;
    visible: boolean;
    onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ recipe, visible, onClose }) => {
    const [items, setItems] = useState([
        { label: 'Inappropriate content', value: 'Inappropriate content' },
        { label: 'Misleading', value: 'Misleading' },
        { label: 'Image error', value: 'Image error' },
        { label: 'Counterfeit', value: 'Counterfeit' }
    ]);
    const [type, setType] = useState('');
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<ReportForm>();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (form) {
                await createReport(form);
                setForm({
                    type: '',
                    content: '',
                    recipeId: ''
                });
                onClose();
            } else {
                Alert.alert("Please fill in the report details.");
            }
        }
        catch (error) {
            Alert.alert("Send Failed", "Something went wrong!");
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={[styles.modalContainer, spacings.p8, shadow.boxShadow]}>
                    {/* <Pressable onPress={onClose}>
                        <AntDesign style={{ textAlign: 'center' }} name="close" size={28} color="#333" />
                    </Pressable> */}
                    <KuraleTitle style={{ textAlign: 'center' }}>Report Recipe</KuraleTitle>
                    <NormalText style={{ textAlign: 'center' }}>Report any abuse or suspicious activity</NormalText>

                    <InriaTitle style={{ textAlign: 'center', ...spacings.mt8 }}>Select Type</InriaTitle>
                    <DropDownPicker
                        open={open}
                        value={type}
                        items={items}
                        setOpen={setOpen}
                        setValue={setType}
                        setItems={setItems}
                        listMode='SCROLLVIEW'
                        style={StyleSheet.flatten([styles.reportDropdown, shadow.boxShadow])}
                        dropDownContainerStyle={[styles.dropDownContainer, spacings.p4]}
                    />

                    <InriaTitle style={{ textAlign: 'center', ...spacings.mt8 }}>Description</InriaTitle>

                    <SimplePost
                        $id={recipe.$id}
                        title={recipe.title}
                        description={recipe.description}
                        topics={recipe.topics}
                        $createdAt={recipe.$createdAt}
                    />

                    <TextInput
                        value={form?.content}
                        onChangeText={(des) =>
                            setForm({
                                content: des,
                                type: type || '',
                                recipeId: recipe.$id
                            })
                        }
                        placeholder='Type description here...'
                        placeholderTextColor={'#33333350'}
                        style={[spacings.pt2, { color: '#333' }]}
                    />

                    <Pressable
                        onPress={() => { !loading && handleSubmit(); }}
                        disabled={loading}
                    >
                        <KuraleTitle style={{ ...spacings.mb20, ...shadow.textShadow, alignSelf: 'flex-end' }}>
                            {loading ? "Sending..." : "Send Report!"}
                        </KuraleTitle>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        height: '100%',
        width: '100%',
        marginTop: 400,
    },
    reportDropdown: {
        marginTop: 20,
        alignSelf: 'center',
        width: 200,
        borderWidth: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    dropDownContainer: {
        borderWidth: 0,
        backgroundColor: '#FFF',
        marginTop: 20,
        marginLeft: 80
    },
});

export default ReportModal;