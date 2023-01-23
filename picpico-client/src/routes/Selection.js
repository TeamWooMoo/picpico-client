import SelectList from "../components/List/SelectList";
import { offVideoTrack } from "../modules/stream.mjs";

const Selection = () => {
    offVideoTrack();
    return (
        <>
            <SelectList />
        </>
    );
};

export default Selection;
