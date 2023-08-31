const FloorButton: React.FC<{
    floorNumber: number;
    totalFloors:number;
    onRequestElevator: (floorNumber: number) => void;
}> = ({ floorNumber, onRequestElevator, totalFloors }) => {
    const handleClick = () => {
        onRequestElevator(floorNumber);
    };

    return (
        <button 
            onClick={handleClick}
            style={{height: `calc(100vh/${totalFloors})`}}
        >
            Floor {floorNumber}
        </button>
    );
};

export default FloorButton;