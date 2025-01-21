import { useSelector } from "react-redux";

function Plan() {
    const isOpen = useSelector((state) => state.sidebar.isOpen);

    return (
        <div className={`flex flex-col top-12 right-0 absolute  transition-all ${
            isOpen ? 'left-72 right-0' : 'left-0 right-0'
        }`}>Plan</div>
    )
}

export default Plan