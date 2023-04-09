import { useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";

export default function Modal({ setModalOpen }) {
  const { contract, account } = useSelector((store) => store.web3);
  const [address, setAddress] = useState("");
  const [removeAccess, setRemoveAccess] = useState("");
  const [sharingData, setSharingData] = useState([]);

  const sharing = useCallback(async () => {
    if (address) {
      await contract.allow(address);
    }
  }, [address, contract]);

  const removeSharing = useCallback(async () => {
    if (removeAccess) {
      console.log(removeAccess);
      await contract.disallow(removeAccess);
    }
  }, [removeAccess, contract]);

  const fetchData = useCallback(async () => {
    const accessList = await contract.shareAccess();
    console.log(accessList[0]);
    setSharingData(accessList);
  }, [contract]);

  useEffect(() => {
    sharingData.length === 0 && fetchData();
  }, [sharing]);

  return (
    <>
      <div>
        <h1>Share with</h1>
        <form>
          <input type="text" onChange={(e) => setAddress(e.target.value)} />
          <select
            onChange={(e) => {
              setRemoveAccess(e.target.value);
            }}
          >
            <option value="">People with access</option>
            {sharingData.length > 0 &&
              sharingData.map((item, index) => (
                <option value={item.user} key={index}>
                  {item.user}
                </option>
              ))}
          </select>
        </form>
        <button onClick={() => setModalOpen(false)}>Cancel</button>
        <button onClick={removeSharing}>Remove Share</button>
        <button onClick={sharing}>Share</button>
      </div>
    </>
  );
}