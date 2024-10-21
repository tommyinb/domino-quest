export interface GestureEvent {
  pointerId: number;

  pointers: {
    clientX: number;
    clientY: number;
  }[];
}
