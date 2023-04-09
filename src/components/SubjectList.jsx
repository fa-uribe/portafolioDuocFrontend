import React from "react";
import { Text, View } from "react-native";
import subjects from '../data/subjects.js';

const SubjectList = () => {
    return (
        <View>
            {subjects.map(subj => (
                <View key={subj.id}>
                    <Text>{subj.id}</Text>
                    <Text>{subj.subjectName}</Text>
                </View>
            ))}
        </View>
    )
}

export default SubjectList;