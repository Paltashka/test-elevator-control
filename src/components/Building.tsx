import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Floor from './Floor';
import { Elevator } from '../interfaces/Elevator.interface';

interface BuildingProps {
    totalFloors: number;
}


const ElevatorControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vh;
  justify-content:center;
`;

const ElevatorControlPanel = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
`;


const Building: React.FC<BuildingProps> = ({
    totalFloors,
}) => {
    const [elevators, setElevators] = useState<Elevator[]>(
        Array.from({ length: 4 }, (_, index) => ({
            id: index + 1,
            currentFloor: 1,
            requestedFloors: [],
            isMoving: false,
        }))
    );

    const handleFloorButtonClick = (floorNumber: number) => {
        const updatedElevators = [...elevators];
        const closestElevator = updatedElevators.reduce(
            (closest, elevator) => {
                const distanceToRequested = Math.abs(
                    elevator.currentFloor - floorNumber
                );
                const closestDistance = Math.abs(
                    closest.currentFloor - floorNumber
                );
                return distanceToRequested < closestDistance
                    ? elevator
                    : closest;
            },
            updatedElevators[0]
        );

        closestElevator.requestedFloors.push(floorNumber);

        setElevators(updatedElevators);
    };

    const moveElevators = () => {
        const updatedElevators = elevators.map((elevator) => {
            if (elevator.requestedFloors.length > 0 && !elevator.isMoving) {
                const nextFloor = elevator.requestedFloors[0];
                const updatedRequestedFloors = elevator.requestedFloors.slice(1);
                const isMoving = true;

                setTimeout(() => {
                    const isMoving = false;
                    const currentFloor = nextFloor;
                    setElevators((prevElevators) =>
                        prevElevators.map((prevElevator) =>
                            prevElevator.id === elevator.id
                                ? {
                                    ...prevElevator,
                                    currentFloor,
                                    requestedFloors: updatedRequestedFloors,
                                    isMoving,
                                }
                                : prevElevator
                        )
                    );
                }, 500);

                return {
                    ...elevator,
                    isMoving,
                };
            }
            return elevator;
        });

        setElevators(updatedElevators);
    };

    useEffect(() => {
        moveElevators();
    }, []);

    return (
        <ElevatorControlContainer>
            <Floor
                totalFloors={totalFloors}
                elevators={elevators}
                onRequestElevator={handleFloorButtonClick}
            />
            <ElevatorControlPanel>
                <button 
                onClick={moveElevators}>Move All Elevators</button>
            </ElevatorControlPanel>
        </ElevatorControlContainer>
    );
};


export default Building;
