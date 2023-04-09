import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Display() {
  const { account, contract } = useSelector((state) => state.web3);

  const [otherAddress, setOtherAddress] = useState("");
  const [images, setImages] = useState([]);

  const getData = useCallback(
    async (e) => {
      e.preventDefault();
      let dataArray;
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
      } else {
        dataArray = await contract.display(account);
      }
      setImages(dataArray);
    },
    [account, otherAddress, contract]
  );

  return (
    <div>
      <form>
        <input type="text" onChange={(e) => setOtherAddress(e.target.value)} />
        <input type="submit" onClick={getData} />
      </form>
      {images.length > 0 &&
        images.map((image, index) => (
          <div style={{ width: "10rem" }} key={index}>
            <a
              href={`https://gateway.pinata.cloud/ipfs/${image.substring(7)}`}
              target="_blank"
            >
              <img
                src={`https://gateway.pinata.cloud/ipfs/${image.substring(7)}`}
                alt="images"
                style={{ width: "100%" }}
              />
            </a>
          </div>
        ))}
    </div>
  );
}
