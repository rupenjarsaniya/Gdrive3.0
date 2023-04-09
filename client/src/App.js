import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import FileUpload from "./components/FileUpload/FileUpload";
import Display from "./components/Display/Display";
import Modal from "./components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
    setAccount,
    setContract,
    setProvider,
} from "./store/reducers/web3Slice";
import { getProvider } from "./utils/getProvider";

function App() {
    const { account } = useSelector((state) => state.web3);
    const dispatch = useDispatch();
    const flag = useRef(false);
    const[modalOpen, setModalOpen] = useState(false);

    const fetchWeb = useCallback(async () => {
        flag.current = true;
        const data = await getProvider();
        dispatch(setAccount(data.address));
        dispatch(setProvider(data.provider));
        dispatch(setContract(data.contract));
    }, [dispatch]);

    useEffect(() => {
        !flag.current && fetchWeb();
    }, [fetchWeb]);

    return (
        <div className="App">
            
            {account ? (
                <h1>{account}</h1>
            ) : (
                <button onClick={fetchWeb}>Connect Wallet</button>
            )}
            <FileUpload />
            <Display />
            {!modalOpen && <button onClick={() => setModalOpen(true)}>Share</button>}
            {modalOpen &&<Modal setModalOpen={setModalOpen} modalOpen={modalOpen} />}
        </div>
    );
}

export default App;
// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
