import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function FileUpload() {
  const { account, contract } = useSelector((state) => state.web3);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const res = await axios({
            method: "POST",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
              pinata_secret_api_key:
                process.env.REACT_APP_PINATA_SECRET_API_KEY,
              "Content-Type": "multipart/form-data",
            },
          });

          contract.add(account, `ipfs://${res.data.IpfsHash}`);
          setFileName(null);
          setFile("");
          setTimeout(async() => {
              let data = await contract.display(account);
              console.log(data);
            }, 4000);
        } catch (error) {
          console.log("Unabale to upload image to pinata", error);
        }
      }
    },
    [account, contract, file]
  );

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(data);
    };
    setFileName(data.name);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="data"
          id="fileUpload"
          disabled={!account}
          onChange={retrieveFile}
        />
        <button type="submit"> Upload</button>
      </form>
      <span>{fileName}</span>
    </div>
  );
}
