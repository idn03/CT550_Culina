import { View, StyleSheet, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Row, Avatar, TextBold, NormalText } from '@/components';
import { spacings, shadow } from '@utils/CulinaStyles';

interface UserCardProps {
  id: string;
  avatar: string;
  email: string;
  fullname: string;
  gender: string;
  age: number;
  isSelected: boolean;
  onSelected: ($id: string) => void;
}

const UserCard = ({
  id,
  avatar,
  email,
  fullname,
  gender,
  isSelected,
  age,
  onSelected,
}: UserCardProps) => {
  return (
    <Pressable
      style={[
        styles.container,
        isSelected && { backgroundColor: '#EEEEEE' },
      ]}
      onPress={() => onSelected(id)}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <Row style={{ ...spacings.p4 }}>
        <Avatar uri={avatar} size={68} />
        <View style={[spacings.ml2, spacings.mr8]}>
          <TextBold>{fullname}</TextBold>
          <NormalText style={shadow.textBlur}>{email}</NormalText>
          <Row style={spacings.mt2}>
            <NormalText>{`${age} years old   •   `}</NormalText>
            <NormalText>{gender}</NormalText>
          </Row>
        </View>

        <View style={[styles.pinIcon, !isSelected && styles.hidden]}>
          <Entypo name="pin" size={20} color="#333" />
        </View>
      </Row>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE60',
    borderRadius: 12,
    width: 360,
  },
  pinIcon: {
    flex: 1,
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
  },
  hidden: {
    display: 'none',
  },
});

export default UserCard;