import * as firebase from 'firebase/app';
// import Timestamp = firebase.firestore.Timestamp;
// import FieldValue = firebase.firestore.FieldValue;

type Timestamp = firebase.firestore.Timestamp;
const Timestamp = firebase?.firestore?.Timestamp;
type FieldValue = firebase.firestore.FieldValue;
const FieldValue = firebase?.firestore?.FieldValue;
export { Timestamp, FieldValue };