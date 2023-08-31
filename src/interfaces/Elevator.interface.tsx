
export interface Elevator {
    id: number;
    currentFloor: number;
    requestedFloors: number[];
    isMoving: boolean;
}