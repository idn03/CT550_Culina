import { useCopilot } from "react-native-copilot";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Row from "./Row";
import KuraleTitle from "./KuraleTitle";
import NormalText from "../override/Text";
import TextBold from "../override/TextBold";
import { spacings } from "@/utils/CulinaStyles";

const TourToolTip = () => {
    const {
        isFirstStep,
        isLastStep,
        goToNext,
        goToPrev,
        stop,
        currentStep,
    } = useCopilot();

    return (
        <View style={spacings.mb3}>
            {/* Content */}
            <View>
                <KuraleTitle>{currentStep?.name || ''}</KuraleTitle>
                <NormalText>{currentStep?.text || ''}</NormalText>
            </View>

            {/* Buttons */}
            <Row style={{ justifyContent: 'flex-end' }}>
                {!isFirstStep && (
                    <TouchableOpacity style={[spacings.mr2, spacings.p3]} onPress={goToPrev}>
                        <TextBold>Previous</TextBold>
                    </TouchableOpacity>
                )}

                {!isLastStep ? (
                    <Row>
                        <TouchableOpacity style={[spacings.mr2, spacings.p3]} onPress={stop}>
                            <TextBold>Skip</TextBold>
                        </TouchableOpacity>

                        <TouchableOpacity style={[spacings.mr2, spacings.p3]} onPress={goToNext}>
                            <TextBold>Next</TextBold>
                        </TouchableOpacity>
                    </Row>
                ) : (
                    <TouchableOpacity style={[spacings.mr2, spacings.p3]} onPress={stop}>
                        <TextBold>Finish</TextBold>
                    </TouchableOpacity>
                )}
            </Row>
        </View>
    )
};

const styles = StyleSheet.create({
    stepNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF30',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TourToolTip;