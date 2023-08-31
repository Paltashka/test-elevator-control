import { Elevator } from "../interfaces/Elevator.interface";
import FloorButton from "./FloorButton";
import styled from 'styled-components';


const ElevatorContainer = styled.div`
  background-color: red;
  font-weight: bold;
  font-size: 18px;
  padding: 10px;
  transition: transform 1.5s ease-in-out;
`;

const FloorContainer = styled.div`
  display: flex;
  flex-direction: row;
  height:100vh;  
`;

const ElevatorColumns = styled.div`
  display:flex;
  flex-direction:row;
`;


const Floor: React.FC<{
    elevators: Elevator[];
    totalFloors: number;
    onRequestElevator: (floorNumber: number) => void;
}> = ({ totalFloors, elevators, onRequestElevator }) => {
    return (
        <FloorContainer>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {Array.from({ length: totalFloors }, (_, index) => (
                    <FloorButton
                        key={index + 1}
                        floorNumber={index + 1}
                        onRequestElevator={onRequestElevator}
                        totalFloors={totalFloors}
                    />
                ))}
            </div>
            <ElevatorColumns
                style={{
                    height: `calc(100vh/${totalFloors})`
                }}
            >
                {elevators.map((elevator) => (
                    <ElevatorContainer
                        key={elevator.id}
                        style={{
                            transform: `translateY(${(elevator.currentFloor - 1) * 100 / totalFloors}vh)`,
                            width:'50px',
                            border: '1px solid white'
                        }}
                    >
                        {elevator.requestedFloors.join(', ')}
                        {` ${elevator.currentFloor}`}
                    </ElevatorContainer>
                ))}
            </ElevatorColumns>
        </FloorContainer>
    );
};

export default Floor;