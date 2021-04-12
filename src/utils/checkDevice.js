import { getUniqueId } from 'react-native-device-info';

export default function checkDevice(studentEquipment) {
  const index = studentEquipment.findIndex(
    ite => ite.id_Equipment === getUniqueId(),
  );

  return index !== -1;
}
